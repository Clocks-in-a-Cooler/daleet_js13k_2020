# DELETE!

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
>
> &mdash; Antoine de Saint-Exupery

A game for JS13K 2020 where...well.

Why am I hard at work implementing these features again? Only for the player to del--wh-what am I doing?

## Building instructions

To make a .zip for the JS13K:

- Use a [Javascript minifier](https://Babeljsjscompress.com/) and minify these Javascript files, in this order:
    
    1. `helpers.js`
    
    2. `messages.js`
    
    3. `features.js`
    
    4. `errors.js`
    
    5. `engines.js`
    
    6. `Entity.js`
    
    7. `Bullet.js`
    
    8. `Crush_trap.js`
    
    9. `Monster.js`
    
    10. `Goal.js`
    
    11. `Player.js`
    
    12. `Shooting_trap.js`
    
    13. `Spike_trap.js`
    
    14. `Spring_trap.js`
    
    15. `Level.js`
    
    16. `game_levels.js`
    
    You might need to use a minifier that uses something like babel-minify.
    
- [Compress the CSS](https://xem.github.io/miniMinifier/css.html)

- Add the compressed CSS and JS files to the HTML, then [compress the HTML](https://xem.github.io/miniMinifier/html.html).