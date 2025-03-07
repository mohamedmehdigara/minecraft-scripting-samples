import * as mc from "@minecraft/server";

const overworld = mc.world.getDimension("overworld");

/**
 * Creates a free-floating feather item in the world.
 * @param {(message: string, status?: number) => void} log: Logger function. If status is positive, test is a success. If status is negative, test is a failure.
 * @param {mc.Location} location Location to center this sample code around.
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/itemStack
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/dimension#spawnitem
 */
export function spawnItem(log: (message: string, status?: number) => void, targetLocation: mc.Location) {
  const featherItem = new mc.ItemStack(mc.MinecraftItemTypes.feather, 1, 0);

  overworld.spawnItem(featherItem, targetLocation);
  log(`New feather created at ${targetLocation.x}, ${targetLocation.y}, ${targetLocation.z}!`);
}

/**
 * Tests whether there is a feather nearby a spot.
 * @param {(message: string, status?: number) => void} log: Logger function. If status is positive, test is a success. If status is negative, test is a failure.
 * @param {mc.Location} location Location to center this sample code around.
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/entityitemcomponent
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/entityqueryoptions
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/dimension#getentities
 */
export function testThatEntityIsFeatherItem(
  log: (message: string, status?: number) => void,
  targetLocation: mc.Location
) {
  const overworld = mc.world.getDimension("overworld");

  const items = overworld.getEntities({
    location: targetLocation,
    maxDistance: 20,
  });

  for (const item of items) {
    const itemComp = item.getComponent("item") as any;

    if (itemComp) {
      if (itemComp.itemStack.id.endsWith("feather")) {
        log("Success! Found a feather", 1);
      }
    }
  }
}
