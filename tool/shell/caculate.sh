#!/bin/bash

function calc
{
  case $2 in
    +) 
      temp=`expr $1 + $3`;
      echo "$temp";
      # echo `expr $1 + $3`;
    ;;
    -) 
      echo "`expr $1 - $3`";
    ;;
    \*) 
      echo "`expr $1 \* $3`";
    ;;
    /) 
      echo "`expr $1 / $3`";
    ;;
  esac
}
calc "$1" "$2" "$3";