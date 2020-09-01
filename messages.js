// helper function to send messages to the player
// ADR players will recognize this feature
function notify(message) {
    var messages    = get_elt("messages");
    var children    = messages.childNodes;
    var message_elt = create_element("message", message); // yes, the same word, in three different situations, three times in the same line of code.
    messages.insertBefore(message_elt, messages.firstChild);
    
    // check for messages no longer visible
    // for reference, the messages element is 550 pixels tall
    children.forEach(c => {
        if (c.offsetTop > 550) {
            messages.removeChild(c);
        }
    });
}