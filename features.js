var features_deleted = {
    // is the feature deleted?
    "bullets": false,
    "crush trap": false,
    "monster": false,
    "physics": false,
    "spike trap": false,
    "spring trap": false,
};

function show_features() {
    Object.keys(features_deleted).forEach(feature => {
        if (!features_deleted[feature]) {
            document.getElementById("files").appendChild(create_element("file", feature));
        }
    });
}

// gotta add the "delete" functionality