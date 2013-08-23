# pldn.io

Pulldown As A Service.

```html
<script src="//pldn.io/html5shiv/jquery@1.9.1/underscore"></script>
```

'nuff said?

## Nota bene

pldn.io is still totally in development. It doesn't work yet and, even if it does and this message is still around, **don't** use it in production *yet*. If you do, you're mental.

## The idea

**pldn.io** will provide [pulldown](https://github.com/jackfranklin/pulldown) for the client side - that means you can get a versioned, minified, concatenated and cached file containing all your front–end dependencies via one single script tag. Sweet, huh?

### Overview

The plan for pld.io is something like the following stack:

Technology | Purpose
---|---
Agressive HTTP caching | The same URL (say `/jquery@1.9.1/underscore`) will, for a long period of time, always produce the same output – so we should set far future cache headers to make sure the result is saved in the browsers HTTP cache.
pldn.io server | If a new URL is hit, the pldn.io server builds a file from its cache, or by deferring up the chain. When an uncached identifier is found, the main pld.io server will be hit – it will defer loading the file to the [Pulldown](https://github.com/jackfranklin/pulldown) module. It will then cache the file contents, build a file with all the requested libraries, in order, then serve it – gzipped, cached and piping hot.
pldn.io cache | We'll cache the file contents associated with each identifier – possibly in memory, possibly in a fast key-value store, meaning `jquery` will be cached separately from `jquery@1.9.1`. That will allow us to build the resulting file really, really fast and avoid having to wait for the Pulldown API.
Pulldown | Pulldown accepts a list of identifiers (like `jquery` and `backbone`), and converts them into URLs for those libraries on a CDN by hitting the Pulldown API.
Pulldown API | The [Pulldown API](https://github.com/phuu/pulldown-api) resolves identifiers to URLs using [pulldown-resolve](https://github.com/phuu/pulldown-resolve). This actually defers to CDNJS, but this dependency can be changed or improved in future.
CDNjs | As mentioned above, Pulldown gets its libraries from CDNjs, although this could be added to or improved in future.

### Who should use this?

Font-end people who's sites have a small set of dependencies, and who don't have the resources or specialist knowledge to do 'the right thing' with concatenation, minification, caching and delivery.

### Notes

- We can include errors and informational notices by simply `console.log` inside the concatted file.
- The information we get from usage will hopefully suggest useful sets, and mean we can predictively cache common combinations.
- Yahoo have a service called [YUI combohandler](http://www.yuiblog.com/blog/2008/07/16/combohandler/) that does a similar thing but only for YUI components – thanks @triblondon for the pointer.
- For optimum JS load times, it's best to get files in the parser as quickly as possible, so one large large HTTP request is not as good as many small ones than can be downloaded in parallel. I guess our compromise is: is that an OK sacrifice given the target users?
- As @jaffathecake points out, sourcemaps for development would be a very useful service.

### Feedback

Feedback on this idea is very welcome. There's a few questions I'd like to answer:

- is this insane?
- would you use it?
- what are the browser performance implications?
- what kind of headers should be set? (`Cache-Control`, `Pragma` etc)
- anything I'm missing?

Answers in a tweet to [@phuunet](http://twitter.com/phuunet), or [open an issue](https://github.com/phuu/pldn.io/issues/new).

## License

MIT, yo.