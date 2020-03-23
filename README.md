<h1 align="center">Welcome to redditImageExtract 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> small script that will download images from a subreddit

### 🏠 [Homepage](https://github.com/mmoehrlein/redditImageExtract)

## Install
install from npm repository:
```sh
npm i -g reddit-image-extract 
```

clone locally and install:
```sh
git clone https://github.com/mmoehrlein/redditImageExtract
cd redditImageExtract
npm i -g
```

## Usage

```sh
reddit-image-extract
```

### config
There are several parameters defined through nconf, which can easily be customized. 

The hirarchy is: commandline arguments > environment variables > defaults

The following command will pull images from /r/bar 
```sh
sub=foo; reddit-image-extract --sub bar 
``` 

## Available Variables
#### sub
subreddit you want to pull images from
type: string
default: undefined

#### dest
directory to save images to
type: string
default: images/

#### max
max amount of posts pulled from reddit (not all post have to actually be pictures and will be ignored. Therefore specifying `max=200` needn't result in 200 pictures)
type: int
default: 100

#### timeout
timeout between batches of requests in ms
type: int
default: 5000

## Author

👤 **Michael Moehrlein <code@moehrlein.io> (moehrlein.io)**

* Github: [@mmoehrlein](https://github.com/mmoehrlein)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mmoehrlein/redditImageExtract).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
