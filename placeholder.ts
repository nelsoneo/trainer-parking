interface Vehicle {
  name: string;
  board: string;
  date: Date | string;
}

(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

    function calulateTime(time: number){
        const min = Math.floor(time / 60000)
        const sec = Math.floor((time % 60000) / 1000)

        return `${min} min e ${sec} sec`;
    }


  function countrYard() {
    function read(): Vehicle[] {
      return localStorage.countrYard ? JSON.parse(localStorage.countrYard) : [];
    }

    function add(vehicle: Vehicle, isSave?: boolean) {
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${vehicle.name}</td>
            <td>${vehicle.board}</td>
            <td>${vehicle.date}</td>
            <td>
                <button class="delete" date-board="${vehicle.board}">X</button>
            </td>
        `;

        row.querySelector('.delete')?.addEventListener('click', function (){
            pDelete(this.dataset.board)
        })

      $("#countryard")?.appendChild(row);

      if(isSave) save([...read(), vehicle]);
    }
    function save(vehicles: Vehicle[]) {
      localStorage.setItem("countrYard", JSON.stringify(vehicles));
    }

    function pDelete(board: string) {
        let {date, name} = read().find((item) => item.board === board);
        console.log(date, name)
        let timeYard = calulateTime(new Date().getTime() - new Date(date).getTime());

        if(!confirm(`the vehicle ${name} stood still for ${timeYard}. You want leave!`))
        return ;
        save(read().filter((item) => item.board !== board))
        render();
    }

    function render() {
      $("#countryard")!.innerHTML = "";
      const vYard = read();

      if (vYard.length) {
        vYard.forEach((item) => add(item));
      }
    }

    return { read, add, save, render, pDelete };
  }

  countrYard().render()

  $("#register")?.addEventListener("click", () => {
    const name = $("#name")?.value;
    const board = $("#board")?.value;

    if (!name || !board) {
      alert("You can inform the name and transit board");
      return;
    }

    countrYard().add({ name, board, date: new Date().toISOString() }, true);
  });
})();
