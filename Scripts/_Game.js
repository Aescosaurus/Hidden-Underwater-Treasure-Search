"use strict";

(function()
{
const gfx = new Graphics();
const kbd = new Keyboard();
const ms = new Mouse();
const sfx = new Sound();

const sub = new Submarine( 60,60 );
const world = new Map();

window.onload = function()
{
	Start();
	const fps = 30;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / fps );
}

function Start()
{
	kbd.Start();
	ms.Start( gfx.GetCanvas() );
	gfx.Start();
	// Initialize below!
	world.InitWorld( MainMap.Data );
}

function Update()
{
	// Update below.
	sub.Update( kbd );
	world.Update( Vec2( 0,0 ) );
}

function Draw()
{
	gfx.DrawRect( Vec2( 0,0 ),gfx.ScreenSize,"black" );
	// Draw below.
	world.Draw( gfx );
	sub.Draw( gfx );
}
})();