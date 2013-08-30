# pldn.io

```html
<script src="//js.pldn.io/html5shiv/jquery@1.9.1/underscore"></script>
```

**js.pldn.io** is [pulldown](https://github.com/jackfranklin/pulldown) for the client side. That means you get:

1. All your front–end dependencies in in one script tag.
2. They're minified, concatenated and cached (we Do The Right Thing™ so you don't have to worry)
3. New libraries at your finger-tips (you just need to know the name)

Sweet, huh?

## Usage

It's mind-blowingly simple. Just add a `script` tag to your page, pointing to `js.pldn.io`:

```html
<script src="//js.pldn.io/"></script>
```

Then add library names. We get these for you from [CDNjs](http://cdnjs.com/).

```html
<script src="//js.pldn.io/jquery/underscore/backbone"></script>
```

You can even specify a specific version!


```html
<script src="//js.pldn.io/jquery@1.9.1"></script>
```

### Who should use this?

People who's sites have a small set of dependencies, and who don't have the resources or specialist knowledge, or time, to do the right thing with concatenation, minification, caching and delivery.

## Anything else?

- We tell you about errors with a simple `console.log` inside the concatted file. If something's going wrong, check your browser's console.

There's probably more – if you have a question, [ask it in an issue](https://github.com/phuu/pldn.io/issues/new).

### Technical Overview

`pld.io` works something like the following:

Technology | In place? |  Purpose
---|---|---
CDN | Yes | We use Amazon's CloudFront CDN for geographical distribution as close to you and your users as possible, optimizing performance.
Agressive HTTP caching | Yes | The same URL (say `/jquery@1.9.1/underscore`) will, for a long period of time, always produce the same output – so we set far future cache headers to make sure the result is saved in the browser's HTTP cache.
pldn.io cache | Yes | We cache recently used URLs, so if the CDN doesn't have it, we might!
pldn.io server | Yes | This is main bit of pldn, finding the libraries you need and building a file. It
pldn.io package cache | No | We will cache the contents of specific libraries to make pldn even faster.
Pulldown | Yes | Pulldown accepts a list of identifiers (like `jquery` and `backbone`), and converts them into URLs for those libraries on a CDN by hitting the Pulldown API.
Pulldown API | Yes | The [Pulldown API](https://github.com/phuu/pulldown-api) resolves identifiers to URLs using [pulldown-resolve](https://github.com/phuu/pulldown-resolve). This actually defers to CDNJS, but this dependency can be changed or improved in future.
CDNjs | Yes | As mentioned above, Pulldown gets its libraries from CDNjs, although this could be added to or improved in future.

### Notes

- The information we get from usage will hopefully suggest useful sets, and mean we can predictively cache common combinations.
- Yahoo have a service called [YUI combohandler](http://www.yuiblog.com/blog/2008/07/16/combohandler/) that does a similar thing but only for YUI components – thanks @triblondon for the pointer.
- For optimum JS load times, it's best to get files in the parser as quickly as possible, so one large large HTTP request is not as good as many small ones than can be downloaded in parallel. I guess our compromise is: is that an OK sacrifice given the target users?
- As @jaffathecake points out, sourcemaps for development would be a very useful service.

### Feedback

Tweet to [@phuunet](http://twitter.com/phuunet), or [open an issue](https://github.com/phuu/pldn.io/issues/new).

## License

MIT, yo.