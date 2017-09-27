//Calculator prototype
function calc() {
  //Variables
  var currentValue = 0;
  var totalValue = 0;
  var index = 0;
  var numArr = [];
  var operArr = [];
  var operationString = "";
  var numIsAnswer = false;

  // Get-Set values
  this.getCurrent = function(){
  if(numArr[index] === undefined) {
    return 0;
  }
  else {
    return numArr[index];
    }
  }
  this.setCurrent = function(value){
      if(numArr[index] === undefined || numIsAnswer){
        if(value === "."){
          numArr[index] = 0 + value;
        }
        else {
          numArr[index] = value;
        }
        numIsAnswer = false;
      }
      else if(numArr[index] === "0" && value !== "."){
          numArr[index] = value;
      }
      else if(value === "."){
          if(!isDecimal()) {
          numArr[index] += value;
        }
      }
      else {
        if(numArr[index] === "0" && value == 0){

        }
        else {
           numArr[index] += value;
        }
      }
  }
  this.getTotal = function() { return totalValue; }
  this.getPervious = function(){
    return operationString;
  }
  this.resetCurrent = function() {
    numArr[index] = "0";
  }
  this.resetValue = function() {
    currentValue = 0;
    totalValue = 0;
    index = 0;
    numArr = [];
    operArr = [];
    operationString = "";
  }

  //Public methods
  this.setOperator = function(value) {
    currentValue = numArr[index];
    if(currentValue === "-" && value === "-"){
      return false;
    }
    if(index === 0 && currentValue !== undefined){
      totalValue = Number(numArr[index]);
    }
    else if(value === "-" && index === 0){
      this.setCurrent(value);
    }
    else {
      sumTotal();
    }
    if(value != "=" && currentValue !== undefined) {
       operationString += currentValue + value;
       operArr.push(value);
       index++;
    }
    else if(numArr[index] === undefined) {
      var regex = new RegExp('\\' + operArr[index-1] + "$");
      operationString = operationString.replace(regex,value);
      operArr[index-1] = value;
    }
    else if(currentValue !== undefined){
      operArr = [];
      numArr = [];
      numArr.push(totalValue);
      index = 0;
      operationString = "";
      numIsAnswer = true;
    }
  }
  this.getPercentage = function (){
    numArr[index] = totalValue*(Number(numArr[index])/100);
  }

  //Private methods
  function addValue(){
    if(!isNaN(numArr[index])){
      totalValue += Number(numArr[index]);
      totalValue = Number(totalValue.toFixed(12));
    }
  }
  function subValue(){
    if(!isNaN(numArr[index])){
      totalValue -= Number(numArr[index]);
      totalValue = Number(totalValue.toFixed(12));
    }
  }
  function multiValue(){
    if(!isNaN(numArr[index])){
      totalValue *= Number(numArr[index]);
      totalValue = Number(totalValue.toFixed(12));
    }
  }
  function divideValue(){
    if(!isNaN(numArr[index])){
      totalValue /= Number(numArr[index]);
      totalValue = Number(totalValue.toFixed(12));
    }
  }

  function sumTotal(){
    switch(operArr[index - 1]){
      case "+":
        addValue();
        break;
      case "-":
        subValue();
        break;
      case "×":
        multiValue();
        break;
      case "÷":
        divideValue();
        break;
      default:
        break;
                   }
  }
  
  function isDecimal(){
   if(numArr[index].toString().indexOf(".") == -1){
     return false;
    }
    else {
     return true;
    }
  }

}

//Operators Array
var operatorsArr = ["-","+","×","÷","="];

//Create new Calculator object
var calculator = new calc();

function checkOperator(value){
  var operator = operatorsArr.filter(function(op){
    return op === value;
  });

  if(operator[0] === undefined) {
    return false;
  }
  else {
    return true;
  }
}

$(document).ready(function(){
  var current = 0;
  $('button').click(function(){
    var value = $(this).children().text();
    if(!isNaN(value) || value === "."){
      calculator.setCurrent(value);
      current = calculator.getCurrent();
       $('.current').children().text(current);
    }
    else if(checkOperator(value)){
      calculator.setOperator(value);

      if(value === "="){
        current = calculator.getTotal();
        $('.previous').children().text("");
      }
       var previous = calculator.getPervious();
       $('.previous').children().text(previous);
       $('.current').children().text(current);
    }
    else if(value === "AC"){
      calculator.resetValue();
      current = calculator.getCurrent();
      $('.current').children().text(current);
      var previous = calculator.getPervious();
      $('.previous').children().text(previous);
    }
    else if(value === "CE"){
      calculator.resetCurrent();
      current = calculator.getCurrent();
      $('.current').children().text(current);
    }
    else if(value === "%"){
      calculator.getPercentage();
      current = calculator.getCurrent();
      $('.current').children().text(current);
    }
   else {
      $('.current').children().text(current);
    }
  });
});
