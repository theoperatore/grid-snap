function interface() {

	var grid  = document.getElementById('grid'),
		startPos = {
			x : 0,
			y : 0
		},
		endPos   = {
			x : 0,
			y : 0
		},
		dx = 0,
		dy = 0,
		curr = 0,
		nextY = 3,
		prevY = 8,
		nextX = 1,
		prevX = 2;

	window.addEventListener('touchstart', start, false);
	window.addEventListener('mousedown', start,false);
	window.addEventListener('touchend', end, false);
	window.addEventListener('mouseup', end, false);

	function start(e) {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === 'mousedown') {
			startPos.x = e.clientX;
			startPos.y = e.clientY;
		}
		else {
			startPos.x = e.changedTouches[0].clientX;
			startPos.y = e.changedTouches[0].clientY;
		}
	}

	function end(e) {
		e.preventDefault();
		e.stopPropagation();

		if (e.type === 'mouseup') {
			endPos.x = e.clientX;
			endPos.y = e.clientY;
		}
		else {
			endPos.x = e.changedTouches[0].clientX;
			endPos.y = e.changedTouches[0].clientY;
		}

		dx = endPos.x - startPos.x;
		dy = endPos.y - startPos.y;

		if (Math.abs(dx) > 25 || Math.abs(dy) > 25) {
			if (curr >= 8) { nextX = 0; }
			if (curr <= 0) { prevX = 8; }
			if (curr > 5)  { nextY = curr - 6; }
			if (curr < 3)  { prevY = curr + 6; }

			if (Math.abs(dx) > Math.abs(dy)) {

				//scroll content left
				if (dx > 0) {
					grid.classList.add('t_' + prevX);
					grid.classList.remove('t_' + curr);

					curr = prevX;
				}

				//scroll content right
				else {
					grid.classList.add('t_' + nextX);
					grid.classList.remove('t_' + curr);

					curr = nextX;
				}
			}
			else {

				//scroll content down
				if (dy > 0) { 
					grid.classList.add('t_' + prevY);
					grid.classList.remove('t_' + curr);

					curr = prevY;
				}
				//scroll content up
				 else {
				 	grid.classList.add('t_' + nextY);
				 	grid.classList.remove('t_' + curr);

				 	curr = nextY;
				} 
			}

			nextY = curr + 3;
			prevY = curr - 3;
			nextX = curr + 1;
			prevX = curr - 1;
		}
	}

}