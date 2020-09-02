var features_deleted = {
    // is the feature deleted?
    "bullets": false,
    "crush trap": false,
    "monster": false,
    "physics": false,
    "shooting trap": false,
    "spike trap": false,
    "spring trap": false,
};

function for_each_feature(f) {
    Object.keys(features_deleted).forEach(f);
}

var selected = "";

function show_features() {
    for_each_feature(feature => {
        if (features_deleted[feature]) {
            // error!
            send_error(`feature not found: "${feature}"`, 404);
        } else {
            get_elt("files").appendChild(create_element("file", feature, () => {
                selected = feature;
                notify(`now selected to delete ${feature}.`);
                get_elt("delete-button").disabled = false;
            }));
        }
    });
    
    notify(`your score is ${error_score}`);
}

function save_deleted_features() {
    // unfortunately, doesn't do what you hope it does. those features are GONE
    for_each_feature(feature => {
        sessionStorage.setItem(feature, features_deleted[feature] ? "deleted" : "not deleted"); // ...yeah
    });
    
    notify("reload the page to effect changes...");
}

function load_deleted_features() {
    for_each_feature(feature => {
        features_deleted[feature] = sessionStorage.getItem(feature) == "deleted";
    });
}

function reset_features() {
    for_each_feature(feature => {
        features_deleted[feature] = false;
    });
    
    game_progress = 0; // sorry
}

get_elt("delete-button").addEventListener("click", () => {
    features_deleted[selected] = true;
    save_deleted_features();
});

get_elt("reset-button").addEventListener("click", () => {
    reset_features();
    save_deleted_features();
});