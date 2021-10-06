# shell

## 查找命令

| 命令    | 适用场景                                         | 优缺点           |
| ------- | ------------------------------------------------ | ---------------- |
| find    | 查找某一类文件，比如文件名部分一致               | 功能强大，速度慢 |
| locate  | 只能查找单个文件                                 | 功能单一，速度快 |
| Whereis | 查找程序的可执行文件、帮助文档等                 | -                |
| which   | 只查找程序的可执行文件，常用于查找程序的绝对路径 | -                |



## 过滤器

### grep

用法

```shell
# 形式一
grep [option] [pattern] [file1, file2, ...]

# 形式二
command | grep [option] [pattern] 
```



### egrep

egrep 相当于  `grep -E` 的简写



## 流编辑器

Sed(Stream Editor) 流编辑器。对标准输出或文件逐行进行处理。

### 语法格式

```shell
# 形式一：
stdout | sed [option] "pattern command";
sed [option] "pattern command" file
```



### pattern 用法表

```shell
# 匹配第10行
sed -n '10 p' /etc/passwd;

# 匹配 1-10行
sed -n '1,10 p' /etc/passwd;

# 第 10 行，开始16行结束, 不包括16行
sed -n '10,5+ p' /etc/passwd;

# root 开头的行
 sed -n '/^root/ p' /etc/passwd;
 
# 以 root 开头的行到以 yarn 开头的行
sed -n '/^root/,/^daemon/ p' /etc/passwd;

# 从第 1 行到daemon开头的行
sed -n '1,/^daemon/ p' /etc/passwd;

# 从daemon开头的行，到第 10 行
sed -n '/^daemon/,10 p' /etc/passwd;

```



### 编辑命令

| 类别 | 编辑命令     | 含义                                                    |
| ---- | ------------ | ------------------------------------------------------- |
| 查询 | p            | 打印                                                    |
| 增加 | a            | 行后追加                                                |
| 增加 | i            | 行前追加                                                |
| 增加 | r            | 将后面指定文件的内容追加到匹配到的行后面                |
| 增加 | w            | 匹配行写入外部文件                                      |
| 删除 | d            | 删除                                                    |
| 修改 | s/old/new    | 将行内第一个 old 替换为 new                             |
| 修改 | s/old/new/g  | 将行内所有的 old 替换为 new                             |
| 修改 | s/old/new/2g | 同一行内，只替换从第2个开始到剩下所有的符合条件的字符串 |
| 修改 | s/old/new/2  | 同一行内，只替换第 2 个                                 |
| 修改 | s/old/new/ig | 将行内所有的 old 替换为 new，忽略大小写                 |



#### 反向引用

```shell
# 将文件中的类型为 hadAAp、hadBBp 等替换为hadAAps、hadBBps
sed -i 's/had..p/&1s/g' str.txt

# 同上，语法形式不同而已
sed -i 's/\(had..p\)/&1s/g' str.txt

# 将 hadAAp、hadBBp 替换为 hadoop
sed -i 's/\(had\)..p/&1oop/g' str.txt
```



## awk

awk 是一个文本处理工具，通常用于处理数据并生成结果报告。



### 语法格式

```shell
# 形式一：输入为文件
awk 'BEGIN{} pattern {commands} END{}' file_name;

# 形式二：标准输出
standard output | awk 'BEGIN{} pattern {commands} END{}';
```





### 参数解释

| 语法格式   | 解释                     |
| ---------- | ------------------------ |
| BEGIN{}    | 正式处理数据之前         |
| pattern    | 匹配模式                 |
| {commands} | 处理命令，后面可能多行   |
| END{}      | 处理完所有匹配数据后执行 |



### awk 的内置变量

| 内置变量                    | 含义                                            |
| --------------------------- | ----------------------------------------------- |
| $0                          | 整行内容                                        |
| $1-$n                       | 当前行的第1-n个字段                             |
| NF[number field  ]          | 当前行的字段个数，也就是多少列                  |
| NR[number row]              | 当前行的行号，从1开始计数                       |
| FNR[file number row]        | 多文件处理时，每个文件行号单独技术，都是从1开始 |
| FS[field separator]         | 输入字段分隔符。不指定默认以空格或tab键分割     |
| RS[row separator]           | 输入行分隔符。默认回车分隔\n                    |
| OFS[output field separator] | 输出字段分隔符。默认为空格                      |
| ORS[output row separator]   | 输出行分隔符。默认为回车换行                    |
| FILENAME                    | 当前输入的文件名称                              |
| ARGC                        | 命令行参数个数                                  |
| ARGV                        | 命令行参数数组                                  |



### printf的格式说明

| 格式符 | 含义                     |
| ------ | ------------------------ |
| %s     | 打印字符串               |
| %d     | 打印十进制数             |
| %f     | 打印一个浮点数           |
| %x     | 打印十六进制数           |
| %o     | 打印八进制数             |
| %e     | 打印数字的科学计数法形式 |
| %c     | 打印单个字符的ASCII码    |



| 修饰符 | 含义                                     |
| ------ | ---------------------------------------- |
| -      | 左对齐                                   |
| +      | 右对齐                                   |
| #      | 显示8进制在前面加0，显示16进制在前面加0x |



```shell
# 以字符串格式打印 /etc/passwd 中的第 7 个字段，以 “:” 作为分隔符
awk 'BEGIN{FS=":"} {printf "%s\n",$7}' /etc/passwd;

# 以 10 进制格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符
awk 'BEGIN{FS=":"} {printf "%d\n", $3}' /etc/passwd;

# 以浮点数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符
awk 'BEGIN{FS=":"} {printf "%f\n", $3}' /etc/passwd;

# 以浮点数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符；保留两位小数
awk 'BEGIN{FS=":"} {printf "%0.2f\n", $3}' /etc/passwd;

# 以16进制数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符
awk 'BEGIN{FS=":"} {printf "%x\n", $3}' /etc/passwd;

# 以16进制数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符；在前面加一个 0X
awk 'BEGIN{FS=":"} {printf "%#x\n", $3}' /etc/passwd;

# 以8进制数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符
awk 'BEGIN{FS=":"} {printf "%o\n", $3}' /etc/passwd;

# 以8进制数格式打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符；在前面加一个 0
awk 'BEGIN{FS=":"} {printf "%#o\n", $3}' /etc/passwd;

# 以科学计数法打印 /etc/passwd 中的第 3 个字段，以 ”:“ 作为分隔符
awk 'BEGIN{FS=":"} {printf "%e\n ", $3}' /etc/passwd;

# 格式化打印两个字段
awk 'BEGIN{FS=":"} {printf "%20s %20s\n", $1, $7}' /etc/passwd;

# # 格式化打印两个字段，左对齐
awk 'BEGIN{FS=":"} {printf "%-20s %-20s\n", $1, $7}' /etc/passwd;
```



### 模式匹配的两种方式

- 第一种模式匹配：RegExp
- 第二种模式匹配：关系运算匹配
  - 常见逻辑运算符：`>、>=、<、<=、==、!=`  
  - 其他逻辑运算符：`~//、!~//` 匹配后面的正则表达式的、不匹配后面的正则表达式的
  - 布尔运算符表达式：`||、&&、!` 或、与、非

```shell
# RegExp
# 匹配 /etc/passwd 文件中含有 root 字符串的所有行
awk 'BEGIN{FS=":"} /root/ {print $0}' /etc/passwd;

# 匹配 /etc/passwd 文件中以 yarn 开头的所有行
awk 'BEGIN{FS=":"} /^yarn/ {print $0}' /etc/passwd;

# 关系运算匹配
# 以 : 为分隔符，匹配 /etc/passwd 文件中第 3 个字段小于 50 的所有行信息
awk 'BEGIN{FS=":"} $3 < 50 {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中第 3 个字段大于 50 的所有行信息
awk 'BEGIN{FS=":"} $3 > 50 {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中第 7 个字段为 /bin/bash 的所有行信息
awk 'BEGIN{FS=":"} $7 == "/bin/bash" {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中第 7 个字段不为 /bin/bash 的所有行信息
awk 'BEGIN{FS=":"} $7 != "/bin/bash" {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中第 3 个字段包含3个数字以上的行信息
awk 'BEGIN{FS=":"} $3~/[0-9]{3,}/ {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中包含 hdfs 或 yarn 的所有行信息
awk 'BEGIN{FS=":"} $1 == "root" || $1 == "yarn" {print $0}' /etc/passwd;

# 以 : 为分隔符，匹配 /etc/passwd 文件中第 3 个字段小于 50 并且第 4 个字段大于50的所有行信息
awk 'BEGIN{FS=":"} $3 < 50 && $4 > 50 {print $0}' /etc/passwd;
```



### 动作表达式中的算术运算符

| 运算符  | 含义                      |
| ------- | ------------------------- |
| +       | 加                        |
| -       | 减                        |
| *       | 乘                        |
| /       | 除                        |
| %       | 模                        |
| ^ 或 ** | 乘方                      |
| ++x     | 在返回x变量之前，x变量加1 |
| x++     | 在返回x变量之后，x变量加1 |

```shell
# 数值运算
awk 'BEGIN{num1=20;num2=30;print num1 - num2}';

# 计算 /etc/services 文件中空白行的数量
awk '/^$/ {sum++} END{print sum}' /etc/services


# 计算学生课程分数平均值，学生课程文件内容如下：
# Allen 80 90 96 98
# Mike  93 98 92 91
# zhang 78 76 87 92
# Jerry 86 89 68 92
# Han   85 95 75 90
# Li    78 88 98 100

# 计算结果
# Allen 80 90 96 98 87.1

awk 'BEGIN{printf "%-10s %-10s %-10s %-10s %-10s %s\n", "Name", "Language", "Math", "English", "Physics", "Average" } {total=$2 + $3 + $4 + $5; average=total / 4;printf "%-10s %-10d %-10d %-10d %-10d %0.2f\n", $1, $2, $3, $4, $5, average}' student.txt;

# 计算 1+2+3+4+...+100的和，请使用 while、do while、for 三种循环方式实现
# while
awk -f while.awk;

# while.awk 相关内容
BEGIN{
        while (i <= 100)
        {
                sum+=i;
                i++;
        }
        print sum;
}

# do while
awk -f do-while.awk;

# do-while.awk 相关内容
BEGIN{
        do
        {
          sum+=i;
          i++;
        } while (i <= 100)
        
        print sum;
}

# for
awk -f for.awk
BEGIN{
        for(i=0; i<=100; i++)
        {
                sum+=i;
        }

        print sum;
}
```



### 字符串函数对照表

| 函数名                | 解释                                                   | 函数返回值                |
| --------------------- | ------------------------------------------------------ | ------------------------- |
| length(str)           | 计算字符串长度                                         | 整数长度值                |
| index(str1, str2)     | 在 str1 中查找 str2 的位置                             | 返回值为位置索引，从1计数 |
| tolower(str)          | 转换为小写                                             | 转换后的小写字符串        |
| toupper(str)          | 转换为大写                                             | 转换后的大写字符串        |
| substr(str,m,n)       | 从 str 的 m 个字符开始，截取 n 位                      | 截取后的子串              |
| split(str, arr, fs)   | 按 fs 切割字符串，结果保存 arr                         | 切割后的子串的个数        |
| match(str, RE)        | 在 str 中按照RE查找，返回位置                          | 返回索引位置              |
| sub(RE, RepStr, str)  | 在 str 中搜索符合RE的字串将其替换为 RepStr，只替换一个 | 替换的个数                |
| gsub(RE, RepStr, str) | 在 str 中搜索符合RE的字串讲起替换为 RepStr，替换所有   | 替换的个数                |



```shell
# 以 : 为分隔符，返回 /etc/passwd 中每行中每个字段的长度
awk -f example_1.awk /etc/passwd;
BEGIN{
        FS=":"
}

{
        i=0
        while(i < NF)
        {       
                if ( i == (NF - 1)) {
                        printf "%d", length($i);
                } else {
                        printf "%d:", length($i);
                }
                i++;
        }
        print "";

}


# 搜索字符串 "I have a dream" 中出现 "ea" 字符串的位置
awk 'BEGIN{str="I have a dream"; location=index(str, "ea"); print location}';
awk 'BEGIN{str="I have a dream"; location=match(str, "ea"); print location}';

# 将字符串 "Hadoop is a bigdata Framework" 全部转换为小写
awk 'BEGIN{str="Hadoop is a bigdata Framework"; print tolower(str)}';

# 将字符串 "Hadoop is a bigdata Framework" 全部转换为大写
awk 'BEGIN{str="Hadoop is a bigdata Framework"; print toupper(str)}';

# 将字符串 "Hadoop Kafka Spark Storm HDFS YARN Zookeeper", 按照空格为分隔符，分隔每部分保存到数组 array 中
awk 'BEGIN{str="Hadoop Kafka Spark Storm HDFS YARN Zookeeper"; split(str, arr, " "); for (a in arr) print arr[a]}';

# 搜索字符串 "Tranction 2345 Start:Selecte * from master" 第一个数字出现的位置
awk 'BEGIN{str="Tranction 2345 Start:Selecte * from master"; location=match(str, /[0-9]/); print location}';

# 截取字符串 "transaction start" 的子串，截取条件从第4个字符开始，截取5位
awk 'BEGIN{str="transaction start"; sub_str=substr(str, 4, 5); print sub_str}';

# 替换字符串 "Tranction 243 Start, Event ID:9002" 中第一个匹配到的数字串为 $ 符号
awk 'BEGIN{str="Tranction 243 Start, Event ID:9002"; sub(/[0-9]+/, "$", str); print str}';

```

###  选项

| 选项 | 解释          |
| ---- | ------------- |
| -v   | 参数传递      |
| -f   | 指定脚本文件  |
| -F   | 指定分隔符    |
| -V   | 查看awk版本号 |

```shell
# 计算横向数据总和，计算纵向数据总和
# Allen 80 90 96 98
# Mike  93 98 92 91
# zhang 78 76 87 92
# Jerry 86 89 68 92
# Han   85 95 75 90
# Li    78 88 98 100

BEGIN{
        printf "%-10s%-10s%-10s%-10s%-10s%-10s\n", "Name", "Language", "Math", "English", "Physics", "Total"
}
{
        total=$2+$3+$4+$5;
        language_sum += $2;
        math_sum += $3;
        english_sum += $4;
        physics_sum += $5;
        printf "%-10s%-10d%-10d%-10d%-10d%-10d\n", $1, $2, $3, $4, $5, total;
}
END {
        printf "%-10s%-10d%-10d%-10d%-10d\n", "", language_sum, math_sum, english_sum, physics_sum, $5
}
```

