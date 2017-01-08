# DashBtnLauncher

Execute external command when Dash button is pushed.

# Dependency

```
$ sudo apt-get install libpcap-dev
$ sudo npm install dash-button
```

# How to use?

```
$ sudo node DashBtnLauncher.js -b XX:XX:XX:XX:XX:XX -e echo hoge
```

# How to execute as service using systemd on Ubuntu?

1.Modify dashbtnlauncher.service

```dashbtnlauncher.service
[Unit]
Description = Ble Button Controller with Dash Button

[Service]
ExecStart = /usr/local/bin/node /opt/DashBtnLauncher/DashBtnLauncher.js -b XX:XX:XX:XX:XX:XX -e echo hoge
Restart = always
Type = simple

[Install]
WantedBy = multi-user.target
```

2.Copy the service file to /etc/systemd/system

```
$ sudo cp dashbtnlauncher.service /etc/systemd/system
```

3. Enable the service

```
$ sudo systemctl enable dashbtnlauncher.service
$ sudo systemctl start dashbtnlauncher.service
$ sudo systemctl status dashbtnlauncher.service
```
