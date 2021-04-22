### How to set file permissions in CLI
https://www.howtogeek.com/437958/how-to-use-the-chmod-command-on-linux/

For envy to work, .env needs to have read and write only for users
whilst groups and others must not have any access rights. This can
be achieved with the following CLI command:

    chmod 600 .env

The three integers above stand for user|group|others

The integers represent the following access rights:

[integer: (binary) access rights]
+ 0: (000) No permission.
+ 1: (001) Execute permission.
+ 2: (010) Write permission.
+ 3: (011) Write and execute permissions.
+ 4: (100) Read permission.
+ 5: (101) Read and execute permissions.
+ 6: (110) Read and write permissions.
+ 7: (111) Read, write, and execute permissions.
