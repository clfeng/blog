#!/bin/bash 

# 1. 获取字符串长度
str="hello world";
echo "${#str}";

# linux 环境中可用，但是本地bash输出有语法错误
len=$(expr length "$str"); 
echo "$len";

# 2. 获取字符索引的位置
str_2="quickstart is a app";
index=$(expr index "$str_2" is);  # 返回值是 3，会将is 拆分为 i 和 s；然后最先找到的是i字符，位置在 3 的位置
echo $index;

# 3. 获取子串长度
str="hello world";
sub_len=$(expr match "$str" hello);
echo $sub_len; # 输出 5

sub_len=$(expr match "$str" world);
echo $sub_len; # 输出 0 表示没有找到，match 的匹配必须从头开始

# 4. 提取字符串中的子串
str="hello wolrd";
echo "${str:6}"; # 截取第6位到字符串末尾的字串
echo "${str:6:2}"; # 截取第6位开始，长度为 2 的子串
echo "${str: -5}"; # 从后往前倒数第5位开始到字符串末尾的子串
echo "${str: -5:2}"; # 从后往前倒数第5位开始，字符串长度为 2 的子串

substr=$(expr substr "$str" 7 2);
echo $substr;

# 如果是用的是 $(expr xxx) 语法则角标是从 1 开始计算
# 如果是用的是 ${xxx} 语法则角标是从 0 开始计算