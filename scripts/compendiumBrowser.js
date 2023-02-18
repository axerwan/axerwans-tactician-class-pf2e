const moduleId = "axerwans-tactician-class-pf2e"

Hooks.once("init", () => {
    game.settings.register(moduleId, "addedToCompendium", {
        scope: "user",
        config: false,
        type: Boolean,
        default: false
    });
})

Hooks.on("ready", async () => {
    //#region Pathfinder 2e
    if (game.system.id === "pf2e") {
        if (!game.settings.get(moduleId, "addedToCompendium")) {
            // Grab the settings
            const settings = await game.settings.get("pf2e", "compendiumBrowserPacks")

            // Add the pack to the settings
            settings.action[`${moduleId}.tactician-actions`].load = true;
            settings.feat[`${moduleId}.tactician-features`].load = true;
            settings.feat[`${moduleId}.tactician-feats`].load = true;
            settings.equipment[`${moduleId}.tactician-equipment`].load = true;
            settings.equipment[`${moduleId}.tactician-weapons`].load = true;

            // Set the settings, both in the client settings and the current session respectively
            await game.settings.set("pf2e", "compendiumBrowserPacks", settings);
            game.pf2e.compendiumBrowser.settings = settings;

            // Set the setting to not re-add the pack if the user disables it in the future and notify about the change in the console
            await game.settings.set(moduleId, "addedToCompendium", true);
            console.log("%Tactician actions, feats, features and equipment have been added to Compendium Browser and automatically enabled!", "color: green; font-weight: bold")
        };
    }
    //#endregion Pathfinder 2e
})