title = "Simon's Defense";

description = `
Defend yourself!
`;

characters = [
`
  LLRR
 LLLRR
LLLLRR
LLLLRR
 LLLRR
  LLRR	
`,`
BBLL
BBLLL
BBLLLL
BBLLLL
BBLLL
BBLL
`,`
YYYYYY
YYYYYY
LLLLLL
LLLLLL
 LLLL
  LL
`,`
  LL
 LLLL
LLLLLL
LLLLLL
GGGGGG
GGGGGG
`
];

const G = {
	WIDTH: 150,
	HEIGHT: 150,
	STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0,
	MISSLE_SPEED: 0.5,
	FIRE_RATE: 120
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	isPlayingBgm: true,
	seed: 5,
	theme: "pixel",
	// isCapturing: true,
	// isCapturingGameCanvasOnly: true,
	// captureCanvasScale: 2
};

/**
* @typedef {{
* pos: Vector,
* speed: number
* }} Star
*/

/**
* @type { Star [] }
*/
let stars;

/**
 * @typedef {{
 * pos: Vector,
 * isActive: boolean
 * }} Player
 */

/**
 * @type { Player }
 */
let playerR;

/**
 * @type { Player }
 */
 let playerY;

 /**
 * @type { Player }
 */
let playerB;

/**
 * @type { Player }
 */
 let playerG;

/**
* @typedef {{
 * pos: Vector,
 * }} Missle
 */

/**
 * @type { Missle [] }
 */
let rMissle;

/**
 * @type { Missle [] }
 */
let gMissle;

/**
* @type { Missle [] }
*/
let bMissle;

/**
 * @type { Missle [] }
 */
let yMissle;

 /**
* @type { number }
*/	
let chance;

 /**
* @type { number }
*/	
let firingCooldown;

function update() {
	if (!ticks) {
		stars = times(20, () => {
			const posX = rnd(0, G.WIDTH);
			const posY = rnd(0, G.HEIGHT);
			return {
				pos: vec(posX, posY),
				speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
			};
		});

		playerR = {
			pos: vec(G.WIDTH * 0.5 + 4, G.HEIGHT * 0.5),
			isActive: true
		};

		playerB = {
			pos: vec(G.WIDTH * 0.5 - 4, G.HEIGHT * 0.5),
			isActive: false
		};

		playerY = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5 - 4),
			isActive: false
		};

		playerG = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5 + 4),
			isActive: false
		};

		rMissle = [];
		gMissle = [];
		bMissle = [];
		yMissle = [];

		chance = 0;
		firingCooldown = G.FIRE_RATE;
	}

	color("black");
	char("a", playerR.pos);

	color("black");
	char("b", playerB.pos);

	color("black");
	char("c", playerY.pos);

	color("black");
	char("d", playerG.pos);

	if (input.isJustPressed) {
		if(playerR.isActive) {
			playerG.isActive = true;
			playerR.isActive = false;
		} else if(playerG.isActive) {
			playerB.isActive = true;
			playerG.isActive = false;
		} else if(playerB.isActive) {
			playerY.isActive = true;
			playerB.isActive = false;
		} else if(playerY.isActive) {
			playerR.isActive = true;
			playerY.isActive = false;
		}
	}

	if (playerR.isActive) {
		color("red");
		particle(
			playerR.pos.x + 2,
			playerR.pos.y,
			3,
			0.5,
			0,
			PI
		)
	} else if(playerG.isActive) {
		color("green");
		particle(
			playerG.pos.x,
			playerG.pos.y + 2,
			3,
			0.5,
			PI/2,
			PI
		)
	} else if(playerB.isActive) {
		color("blue");
		particle(
			playerB.pos.x - 2,
			playerB.pos.y,
			3,
			0.5,
			PI,
			PI
		)
	} else if(playerY.isActive) {
		color("yellow");
		particle(
			playerY.pos.x,
			playerY.pos.y - 2,
			3,
			0.5,
			-PI/2,
			PI
		)
	}

	firingCooldown--;
	if (firingCooldown <= 0) {
		chance = rndi(1, 5);
		if (chance == 1 && rMissle.length < 2) {
			rMissle.push({
				pos: vec(G.WIDTH, G.HEIGHT * 0.5)
			});
		} else if (chance == 2 && gMissle.length < 2) {
			gMissle.push({
				pos: vec(G.WIDTH * 0.5, G.HEIGHT)
			});
		} else if (chance == 3 && bMissle.length < 2) {
			bMissle.push({
				pos: vec(0, G.HEIGHT * 0.5)
			});
		} else if (yMissle.length < 2) {
			yMissle.push({
				pos: vec(G.WIDTH * 0.5, 0)
			});
		}

		firingCooldown = G.FIRE_RATE - difficulty * 40;
		if (firingCooldown <= 30) firingCooldown = 30;
		chance = 0;		
	}

	rMissle.forEach((rm) => {
		rm.pos.x -= G.MISSLE_SPEED;
		color("light_red");
		box(rm.pos, 4);

		color("red");
		particle(
			rm.pos.x - 1,
			rm.pos.y,
			2,
			0.5,
			0,
			PI/4
		)
	});

	gMissle.forEach((gm) => {
		gm.pos.y -= G.MISSLE_SPEED;
		color("light_green");
		box(gm.pos, 4);

		color("green");
		particle(
			gm.pos.x,
			gm.pos.y - 1,
			2,
			0.5,
			PI/2,
			PI/4
		)
	});

	bMissle.forEach((bm) => {
		bm.pos.x += G.MISSLE_SPEED;
		color("light_blue");
		box(bm.pos, 4);

		color("blue");
		particle(
			bm.pos.x + 1,
			bm.pos.y,
			2,
			0.5,
			PI,
			PI/4
		)
	});

	yMissle.forEach((ym) => {
		ym.pos.y += G.MISSLE_SPEED;
		color("light_yellow");
		box(ym.pos, 4);

		color("yellow");
		particle(
			ym.pos.x,
			ym.pos.y + 1,
			2,
			0.5,
			-PI/2,
			PI/4
		)
	});

	remove(rMissle, (rm) => {
		color("transparent");
		const isColliding = char("a", playerR.pos).isColliding.rect.light_red;
		if (isColliding && playerR.isActive) {
			play("laser");
			color("red");
			particle(playerR.pos);
			if (rMissle.length == 1) {
				addScore(10, playerR.pos);
			}
			return (rm.pos.x < G.WIDTH * 0.5 + 10);
		}
		if(isColliding && !playerR.isActive) {
			end();
			play("explosion");
		}

		return(rm.pos.x < G.WIDTH * 0.5 + 8);
	});

	remove(gMissle, (gm) => {
		color("transparent");
		const isColliding = char("d", playerG.pos).isColliding.rect.light_green;
		if (isColliding && playerG.isActive) {
			play("jump");
			color("green");
			particle(playerG.pos);
			if (gMissle.length == 1) {
				addScore(10, playerG.pos);
			}
			return (gm.pos.y < G.HEIGHT * 0.5 + 10);
		}
		if(isColliding && !playerG.isActive) {
			end();
			play("explosion");
		}

		return(gm.pos.y < G.HEIGHT * 0.5 + 8);
	});

	remove(bMissle, (bm) => {
		color("transparent");
		const isColliding = char("b", playerB.pos).isColliding.rect.light_blue;
		if (isColliding && playerB.isActive) {
			play("select");
			color("blue");
			particle(playerB.pos);
			if (bMissle.length == 1) {
				addScore(10, playerB.pos);
			}
			return(bm.pos.x > G.WIDTH * 0.5 - 10);
		}
		if(isColliding && !playerB.isActive) {
			end();
			play("explosion");
		}

		return(bm.pos.x > G.WIDTH * 0.5 - 8);
	});

	remove(yMissle, (ym) => {
		color("transparent");
		const isColliding = char("c", playerY.pos).isColliding.rect.light_yellow;
		if (isColliding && playerY.isActive) {
			play("coin");
			color("yellow");
			particle(playerY.pos);
			if (yMissle.length == 1) {
				addScore(10, playerY.pos);
			}
			return(ym.pos.y > G.HEIGHT * 0.5 - 10);
		}
		if(isColliding && !playerY.isActive) {
			end();
			play("explosion");
		}

		return(ym.pos.y > G.HEIGHT * 0.5 - 8);
	});

	stars.forEach((s) => {
		s.pos.y += s.speed;
		s.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

		color("light_cyan");
		box(s.pos, 1);
	});
}
