## Delete! postmortem

When I saw the theme "404" I thought about many things: the error code (of course), a [local highway](https://en.wikipedia.org/wiki/Ontario_Highway_404), even the [a propliner](https://en.wikipedia.org/wiki/Martin_4-0-4). I eventually settled on a game centered around the error code. I've been thinking a lot about platformers, especially since I had just finished making another platformer.

I thought about how sometimes, Javascript files don't load properly and there ends up having a missing feature and a 404 error. I wondered about the player _intentionally deleting_ features of the game, to make it easier.

I started by drawing out what the UI would look like. I'm not good with HTML or CSS, so this is usually the hardest part for me, which is why I decided to use pixel values for the dimensions of the components.

I then went to work making the actual game. I've never taken a coding class before, so much of what I know is from books I've read, in particular _Eloquent Javascript_. This was also the first time I used ES6 classes, instead of using prototypes, so I wasn't sure how large the game would be when I minified it. And just for fun, I kept track of the uncompressed size of the source code for each commit.

First I made sure the non-platformer parts of the game worked: displaying messages to the player, displaying the features, tracking which features are "deleted" (in reality, deactivated) via `sessionStorage`, and displaying "error" messages to the player and tell them a feature has been "deleted". Once that was out of the way, I can make the platformer parts.

For the player to be able to "delete" a feature, I had to implement it. These features were inspired by _Spelunky_, and I also included the ability to deactivate gravity. This part went pretty smoothly, being in my comfort zone. It was during this part of development, though, that the file sizes skyrocketed. I was having doubts as to whether I could squeeze everything into 13kB. To save space, I decided not to include textures, but instead draw shapes directly onto the canvas. I still think it's a nice aesthetic.

I've previously participated in a similar competition, the [2Kplus](https://itch.io/jam/2kplus-jam) jam, where the game had to fit into _two kilobytes_. Even stripped down, I had issues fitting the game into the limit, so I was quite nervous about getting Delete! to fit into 13 kilobytes.

I shouldn't have worried, though. When I minified the Javascript files, the size shrank from over 40 kilobytes of code to just under 19. I also minified the HTML and CSS. After zipping everything, the game was 6.6 kilobytes.

I had way more breathing room than I thought.

To save time, I reused a level editor I made for [Draw My Sprite!](https://clocks-in-a-cooler.github.io/draw_my_sprite/).

To be honest, what I need is more experience with programmming in general. I've seen what other people have done in 13 kilobytes. Hopefully I can make something like _that_ one day.

