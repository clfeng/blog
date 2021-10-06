#!/bin/bash

# 变量替换
echo "----------头部开始删除----------";
variable_1="hello world, hello clf";
echo "${variable_1#*llo}"; # 从头开始匹配，最短删除，可以理解为正则的非贪婪模式
echo "${variable_1##*llo}"; # 从头开始匹配，最长删除，可以理解为正则的贪婪模式

echo "----------尾部开始删除----------";
echo "${variable_1%lo*}"; # 从尾部开始匹配，最短删除
echo "${variable_1%%lo*}"; # 从尾部开始匹配，最长删除

echo "----------字符串替换----------";
echo "${variable_1/hello/Hi}";
echo "${variable_1//hello/Hi}";

# str=""
echo "${str-clf}";