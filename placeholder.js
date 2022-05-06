(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calulateTime(time) {
        const min = Math.floor(time / 60000);
        const sec = Math.floor((time % 60000) / 1000);
        return `${min} min e ${sec} sec`;
    }
    function countrYard() {
        function read() {
            return localStorage.countrYard ? JSON.parse(localStorage.countrYard) : [];
        }
        function add(vehicle, isSave) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${vehicle.name}</td>
            <td>${vehicle.board}</td>
            <td>${vehicle.date}</td>
            <td>
                <button class="delete" date-board="${vehicle.board}">X</button>
            </td>
        `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                pDelete(this.dataset.board);
            });
            (_b = $("#countryard")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (isSave)
                save([...read(), vehicle]);
        }
        function save(vehicles) {
            localStorage.setItem("countrYard", JSON.stringify(vehicles));
        }
        function pDelete(board) {
            let { date, name } = read().find((item) => item.board === board);
            console.log(date, name);
            let timeYard = calulateTime(new Date().getTime() - new Date(date).getTime());
            if (!confirm(`the vehicle ${name} stood still for ${timeYard}. You want leave!`))
                return;
            save(read().filter((item) => item.board !== board));
            render();
        }
        function render() {
            $("#countryard").innerHTML = "";
            const vYard = read();
            if (vYard.length) {
                vYard.forEach((item) => add(item));
            }
        }
        return { read, add, save, render, pDelete };
    }
    countrYard().render();
    (_a = $("#register")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const board = (_b = $("#board")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !board) {
            alert("You can inform the name and transit board");
            return;
        }
        countrYard().add({ name, board, date: new Date().toISOString() }, true);
    });
})();
