# earburn

A browser extension to identify sites that accept Webmentions

Adding [Indie Web](https://indieweb.org/) features to [my blog](https://john.colagioia.net/blog) raised an interesting question for me, especially as I started to think about using my [social media roundup](https://john.colagioia.net/blog/tag/linkdump) and [Free Culture Book Club](https://john.colagioia.net/blog/tag/bookclub) posts to respond to other people's work that I present on the blog.  Namely, how do I know whether replying to an article or other project will register, or if doing that will join the other text in a post that largely sits waiting for people to find it?

I *can* know that---and did, for a few trial runs---by opening up the target page's HTML source code and manually searching for something that looks like this.

```html
<link rel="webmention" href="https://some.url.example">
```

If I can find that, then I know that I can send a Webmention, and let the server at that link figure it out.  If I don't find it, then sending it doesn't work any better than the post already does.  However, checking this manually requires that I remember to do it for every page that I might want to mention in the blog, *and* the process takes time.

Given that situation, I decided to borrow from my own past on the blog and [write a browser extension](https://john.colagioia.net/blog/2020/06/17/plugin.html) to do the work for me.  I call it **Earburn** as a reference to the idiom about feeling one's [ears burning](https://en.wiktionary.org/wiki/ears_are_burning) when people talk about them behind their back.

## General Process

On startup and on every change to the current URL---whether by changing tabs or by visiting a new page---the extension checks all `link` elements with a `rel=` property in the HTML for a value containing `webmention`.  Based on the results, it makes a request message to the background worker to set the extension's icon appropriately.

The background worker also listens for tab changes, sending a request message back to the main worker, which completes the cycle.

## Credits

While I hand-drew the ear, I used [Fire Icon](https://commons.wikimedia.org/wiki/File:FireIcon.svg) by [Piotr Jaworski](https://pl.wikipedia.org/wiki/Wikipedysta:Piom), released into the public domain.
