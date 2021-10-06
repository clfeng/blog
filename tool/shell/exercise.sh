#!/bin/bash 

# 需求描述
# 变量 string="Bigata process framework is Hadoop,Hadoop is an open source project"
# 执行脚本后，打印输出 string 字符串变量，并提出用户一以下选项：
# （1）、 打印 string 长度
# （2）、删除字符串中所有的 Hadoop
# （3）、替换第一个 Hadoop 为 Mapreduce
# （4）、替换所有 Hadoop 为 Mapreduce
# 用户输入数字 1｜2｜3｜4，可以执行对应项的功能；输入q|Q则退出交互模式

# 思路分析：
# 1、将不同的功能模块划分，并编写函数
#   function print_tips
#   function len_of_string
#   function del_hadoop
#   function rep_hadoop_mapreduce_first
#   function rep_hadoop_mapreduce_all

# 2、实现第一步所定义的功能函数

# 3、程序主流程的设计


string="Bigata process framework is Hadoop,Hadoop is an open source project";
# echo ${#string};
# echo ${string//Hadoop/''};
# echo ${string/Hadoop/Mapreduce};
# echo ${string//Hadoop/Mapreduce};

function print_tips {
  echo "*********************************";
  echo "（1）打印string长度";
  echo "（2）删除字符串中素有的Hadoop";
  echo "（3）替换第一个Hadoop为Mapreduce";
  echo "*********************************";
}

function len_of_string {
  echo "${#string}";
}

function del_hadoop {
  echo "${string//Hadoop/}";
}

function rep_hadoop_mapreduce_first {
  echo "${string/Hadoop/Mapreduce}";
}

function rep_hadoop_mapreduce_all {
  echo "${string//Hadoop/Mapreduce}";
}

# case $VAR in
#   1) echo 1
#   ;;
#   2|3) echo 2 or 3
#   ;;
#   *) echo default
#   ;;
# esac

while true; 
do
  echo " 【string=$string】";
  print_tips;
  read -p "Please input your choice(1|2|3|4|q|Q):" choice;
  
  case $choice in
    1) 
      len_of_string
    ;;
    2) 
      del_hadoop
    ;;
    3) 
      rep_hadoop_mapreduce_first;
    ;;
    4) 
      rep_hadoop_mapreduce_all;
    ;;
    q|Q) 
      exit;
    ;;
    *)
      echo "Error, input only in (1|2|3|4|q|Q)";
    ;;
  esac
done

