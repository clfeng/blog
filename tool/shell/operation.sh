#!/bin/bash

# 语法
# expr $num1 operator $num2
# $(($num1 operator $num2))

# 操作符
# num1 | num2; num1 不为空且非0，返回num1；否则返回num2
# num1 & num2; num1 不为空且非0，返回num1；否则返回0
# num1 < num2; num1 小于 num2，返回1；否则返回 0
# num1 <= num2; num1 小于等于 num2，返回1；否则返回 0
# num1 = num2; num1 等于 num2，返回1；否则返回 0
# num1 != num2; num1 不等于 num2，返回1；否则返回 0
# num1 > num2; num1 大于 num2，返回1；否则返回 0
# num1 >= num2; num1 大于等于 num2，返回1；否则返回 0

num1=0;
num2=100;

expr $num1 \| $num2;
expr $num1 \& $num2;
expr $num1 \< $num2;
expr $num1 \<= $num2;
expr $num1 \> $num2;
expr $num1 \>= $num2;
expr $num1 = $num2;
expr $num1 != $num2;

expr $num1 + $num2;
expr $num1 - $num2;
expr $num1 \* $num2;
expr $num1 / $num2;
expr $num1 % $num2;


