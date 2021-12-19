
# requirements.txt

requirements.txt Its Alow For You To Install A lot Of Npm
<br>
Packages For You As Fast As possible Its Can

## Short explain For requirements.txt
if You Know Python You Will know How They
Install <br>
All Libraries From requirement.txt File
<br>
This requirements.txt Works The Same But For Nodejs

# example Usage:
```shell
# [] Means Optional
npx txtrequirements --file=[fileDir] --log=[true|false]

#example:
npx txtrequirements --file="./willbeInstalled/file.txt" --log=yes
```
Why Filedir Is Optional:
Because Its default value: "mainProjectDir/requirements.txt"

its May be required if You dont create requirements.txt
file in the main dir and write Your packages


## Reference

| argument |Optional| default     | Description                |
| :-------- |:-------| :------- | :------------------------- |
| `--file` |`Yes`| `requirements.txt` | This Will Read All libraries And Install them |
| `--log`      |`Yes`| `false` | If You Need To Send A log On checking Package Or Installing it |

## requirements.txt File Syntax
the file Will Be With A Default Syntax <br>
ex:
```txt
# requirements.txt
# <packageName (required)>[verion (Optional)]
node-fetch@2.6.1
discord.js
...etc
```


## Screenshots
### These Messages In Console When `--log` Is Active
![App Screenshot](https://i.ibb.co/stcM6p5/Screenshot-2021-12-19-194747.jpg)


## ♥ Support

If You Need Any Help Just Ask In: [Discord Support Server](https://discord.gg/CuBnSfaFz3)

