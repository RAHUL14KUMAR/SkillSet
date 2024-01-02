# SKILLSET 

Hi!  here i am develop a **RESTFul API** for a simple**Note-Takking Application**.
The api should allow user to create,retrive,update,and delete the text notes 

# AUTHENTICATION ENDPOINTS
**To create any Note user first have to register and then login himself/herself after that he/she allow to start the post**
 
**1_register endpoints -> /user/register**
from this end endpoint user can register himself/herself by putting his/her name, email and password.

if **any of the fields miss** it returns please enter all the details 

it also checks the **email and password that you enter and validate it** if it returns true than system will enter your details to the  databases by hashing you password and also validating that whether the email is used  only one time or not. If **not** it will print the message that **user with this email is already exists**

//////////////////////

**2_login endpoints -> /user/login**
from this end endpoint user can login himself/herself by putting his/her registered email and password.

if **any of the fields miss** it returns please enter all the details 

it also checks the **email and password that you enter and validate it** if it returns true than system will validate the password present in the database and password that is passed by user is same or not. If **not** it will print the message that **wrong credentials**



//////////////////////

**3_profile endpoints -> /user/profile**


It will print the information about the logged in user,

## NOTES API END POINT

**1_Note create endpoints -> /note/**

By validating whether the title and content is passed or not. if **passing** Note has been recorded in the database by print all the details that logged in user have put in the **Note**.

///////////////////
**2_GetAllNote endpoints -> /note**

it will give the information of all the **Notes** present in the database.


/////////////////////
**3_update the particular note -> /note/:id**

system first check whether the **id** that is passed is present in the system or not. if **not** it will print some the message that **no note with this id found**

if **yes** System will validate whether the **Note** is being updated by **owner** or not . if **not** it will print the message that **actual note owner has right to update this note**

 if **yes** we pass the **Title** and **Content** as a body according to the requirement and we update the **Note**


///////////////////////
**4_getNoteDescriptionById -> /note/:id**
system first check whether the **id** that is passed is present in the system or not. if **not** it will print some the message that **no note with this id found**
if **yes** It will print all the information related to the particular **Note**  including its author details


/////////////////////
**5_delete the particular note -> /note/:id**


system first check whether the **id** that is passed is present in the system or not. if **not** it will print some the message that **no note with this id found**

if **yes** System will validate whether the **Note** is being deleted by **owner** or not . if **not** it will print the message that **actual note owner has right to delete this note**

After validating  this the system will delete the particular  **Note**


//////////////////////
**6_ print all the note posted by logged In User -> /note/notes**

It will print all the **Note** that is posted by logged in user.
if he/she has not been post any **Note** then it will print a message that **you have not post/create any Note**

## Switch to another file

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.

## Create a file

create a **.env** file and in this file store 3 things 
1-**MONGODB_URL**
2-**JWT_SECRET**
3-**PORT**
