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
        if (!features_deleted[feature]) {
            document.getElementById("files").appendChild(create_element("file", feature, () => {
                selected = feature;
                notify(`selected to delete ${feature}.`);
                document.getElementById("delete-button").disabled = false;
            }));
        }
    });
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
}

document.getElementById("delete-button").addEventListener("click", () => {
    features_deleted[selected] = true;
    save_deleted_features();
});

document.getElementById("reset-button").addEventListener("click", () => {
    reset_features();
    save_deleted_features();
});