const mjs_a = import("./try1.mjs");

// ~async function aa() {
//     await mjs_a
//     console.log(mjs_a)
// }();

exports.readFromDb = async (query) => {
  return await mjs_a
  //await console.log(query)
};