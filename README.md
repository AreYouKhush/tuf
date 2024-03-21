
# TUF - Code submissions

The project aims to let anyone run and submit codes in 30+ languages.

### Tasks
1. ✅ Construct a form to gather the following fields: username, preferred code language (C++, Java, JavaScript, Python), standard input (stdin), and the source code.
2. ✅ Present all submitted entries in a tabular format, showcasing the username, code language, stdin, and the timestamp of submission. Additionally, limit the display of the source code to the initial 100 characters.
3. ✅ Implement Redis to cache the information displayed in the table on page 2, reducing the number of database read requests.
4. ✅ Utilize external APIs, such as Judge0, to retrieve the output of the code and exhibit it in a new column (stdout) on page 2.



## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MySql, Redis

**API:** Judge0


## Form:

#### Takes input:-

| Username | Language     | Stdin |  Source Code  | 
| :--------| :-------     | :-----|:------------  |

#### Gives Output:-
 |Stdout|
 | :------|

![Screenshot 2024-03-21 192729](https://github.com/AreYouKhush/tuf/assets/71877944/f47e9297-df06-405e-a818-3c93faca4241)

## Submission Info:

#### Table Structure:-
|Id| Username | Language     | Stdin |  Source Code  |Stdout|Submitted On| 
|:---| :--------| :-------     | :-----|:------------  |:--|:---|

![Screenshot 2024-03-21 192909](https://github.com/AreYouKhush/tuf/assets/71877944/90e8aa7f-8f9d-44e3-802a-88fe40d55e75)
## Run Locally

Clone the project

```bash
  git clone https://github.com/AreYouKhush/tuf
```

Go to the project directory

```bash
  cd tuf 
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

