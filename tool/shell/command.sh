#!/bin/bash 

# `` 和 $() 两者是等价的，但推荐初学者使用$()，易于掌握；缺点是极少数 unix 可能不支持。但是``是都支持的
# $(()) 主要用来进行整数运算，包括加减乘除，引用变量前面可以加$，也可以不加 $
# `expr $param1 operator $param2`
# $(( $param1 + $param2 ))
# num1=5;
# echo "$((num1 + 5))";

num1=20;
num2=30;

num1++;
((num2--));
echo $num1;
echo $num2;