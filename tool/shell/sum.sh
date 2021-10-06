#!/bin/bash

read -p "please input a positive number:" num;

expr $num + 1 &> /dev/null;

if [ $? -eq 0 ] 
then
  if [ `expr $num \> 0` -eq 1 ] 
  then
    sum=0;

    for((i=0; i <= $num; i++))
    do
      sum=`expr $sum + $i`;
    done
    echo "1+2+3...+$num is $sum";
  fi
fi