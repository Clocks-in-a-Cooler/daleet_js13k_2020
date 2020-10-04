var error_score = 0;

function send_error(message, code) {
    if (!code) {
        code = 400;
    }
    get_elt("errors").appendChild(create_element("error",
        `error ${ code }: ${ message }`));
    
    error_score += code;
}