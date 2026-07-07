using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DSSIAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private static readonly List<Item> items = [
            new Item { Id = 1, Name = "Abdul"} ,
            new Item { Id = 2, Name = "Anand"}
        ];
        private static int nextId = 3;

        [HttpGet]
        public ActionResult<List<Item>> Get() => Ok(items);

        [HttpGet("{id}")]
        public ActionResult<Item> Get(int id)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public ActionResult<bool> Create(Item item)
        {
            item.Id = nextId++;
            items.Add(item);
            return Ok(true);
        }

        [HttpPut("{id}")]
        public ActionResult<bool> Update(int id, Item updated)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();

            item.Name = updated.Name;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();

            items.Remove(item);
            return NoContent();
        }
    }
}
