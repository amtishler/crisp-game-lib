title = "";

description = `

`;

characters = [
`
  cc
 LLLL
LLLLLL
LLLLLL
 cccc
`
];

const G = {
	WIDTH: 75,
	HEIGHT: 75,
	UFO_SPEED: 5
};

options = {
	theme: "pixel",
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	// isCapturing: true,
	// isCapturingGameCanvasOnly: true,
	// captureCanvasScale: 2
};

/**
 * @typedef {{
 * pos: Vector
 * }} Player
 */

/**
 * @type { Player }
 */
 let platform;

 /**
  * @type { Player }
  */
 let player

 /**
  * @type { Player }
  */
 let ufo;

 /**
  * @type { boolean }
  */
 let right;

 /**
  * @type { number }
  */
 let frameCount;

function update() {
	if (!ticks) {
		platform = {
			pos: vec(G.WIDTH/2-5, G.HEIGHT*0.6)
		};

		ufo = {
			pos: vec(G.WIDTH/2, 2)
		};

		player = {
			pos: vec(G.WIDTH/2, G.HEIGHT*0.7)
		};

		right = true;
		frameCount = 0;
	}

	color("black");
	char("a", ufo.pos);

	color("cyan");
	particle(
		ufo.pos.x,
		ufo.pos.y,
		100,
		10,
		PI/2,
		PI/3
	);

	color("cyan");
	line(platform.pos.x-7, platform.pos.y+7, platform.pos.x-7, platform.pos.y+35, 1);

	color("cyan");
	line(platform.pos.x+7, platform.pos.y+7, platform.pos.x+7, platform.pos.y+35, 1);
	
	color("red");
	line(platform.pos.x-5, platform.pos.y, platform.pos.x+5, platform.pos.y, 4);

	color("white");
	line(platform.pos.x, platform.pos.y+7, platform.pos.x, platform.pos.y+35, 14);

	color("green");
	box(player.pos.x, player.pos.y, 3, 3);

	color("white");
	line(0, G.HEIGHT, G.WIDTH, G.HEIGHT, 20);

	if (right) {
		platform.pos.x += 0.1 * difficulty*1.2;
		if (platform.pos.x >= G.WIDTH-20) right = false;
	} else {
		platform.pos.x -= 0.1 * difficulty*1.2;
		if (platform.pos.x <= 20) right = true;
	}

	if (input.isJustPressed) {
		if(right) {
			player.pos.x += 1;
		} else {
			player.pos.x -= 1;
		}
	}

	color("transparent");
	const isColliding = box(player.pos.x, player.pos.y, 3, 3).isColliding.rect.cyan;
	if (isColliding) {
		play("select");
		end();
	}

	frameCount++;
	if (frameCount == 60) {
		addScore(10, G.WIDTH, G.HEIGHT/2);
		frameCount = 0;
	}
	color("red");
	text("MASH!", ufo.pos.x-33, G.HEIGHT/4);

}
