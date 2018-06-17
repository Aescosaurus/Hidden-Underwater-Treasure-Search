"use strict";

(function()
{
const gfx = new Graphics();
const kbd = new Keyboard();
const ms = new Mouse();
const sfx = new Sound();

const sub = new Submarine( 60,60,gfx );
const world = new Map();
const ct = new ColorTransformer();

let gold = 0;
let moveAmount = Vec2( 0,0 );

const enemyBullets = [];

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
	world.InitWorld( gfx,enemyBullets );
}

function Update()
{
	// Update below.
	sub.Update( kbd );
	
	moveAmount.Add( sub.GetDelta() );
	
	// if( moveAmount.y > 210 )
	// {
	// 	moveAmount.y -= sub.GetDelta().y;
	// 	sub.MoveAwayFrom( sub.GetPos().GetAdded( Vec2( 0,-1 ) ) );
	// }
	
	world.MoveAll( sub.GetDelta() );
	
	if( sub.CheckGroundHits( world.GetTerrainRects() ) )
	{
		world.MoveAll( sub.GetDelta() );
	}
	
	if( sub.CheckEnemyHits( world.GetEnemies() ) )
	{
		world.MoveAll( sub.GetDelta() );
	}
	
	gold += sub.CheckTreasureHits( world.GetTreasures() );
	
	if( kbd.KeyDown( ' ' ) )
	{
		sub.Hurt( 999 );
	}
	
	world.Update( sub.GetPos(),gfx );
	
	const subRect = sub.GetRect();
	for( var eb in enemyBullets )
	{
		const bull = enemyBullets[eb];
		bull.Update( sub.GetDelta() );
		
		if( bull.GetRect().Overlaps( subRect ) )
		{
			bull.Kill();
			
			sub.Hurt( 1 );
			sub.MoveAwayFrom( bull.GetPos() );
		}
	}
	
	for( var eb in enemyBullets )
	{
		if( enemyBullets[eb].WillKill() )
		{
			enemyBullets.splice( eb,1 );
		}
	}
	
	sub.ResetDelta();
	
	if( sub.GetPos().y < 0 )
	{
		// Return to menu.
	}
}

function Draw()
{
	gfx.DrawRect( Vec2( 0,0 ),gfx.ScreenSize,ct.Transform( "#269" ) );
	gfx.DrawRect( Vec2( 0,moveAmount.y )
		.GetSubtracted( Vec2( 0,gfx.ScreenHeight ) ),
		gfx.ScreenSize,ct.Transform( "#48A" ) );
	// Draw below.
	world.Draw( gfx );
	
	for( var eb in enemyBullets )
	{
		enemyBullets[eb].Draw( gfx );
	}
	
	sub.Draw( gfx );
	
	gfx.DrawText( Vec2( 115,25 ),"25PX Lucida Console",
		"gold",gold );
	
	// for( var i in world.GetTerrainRects() )
	// {
	// 	const x = world.GetTerrainRects()[i];
	// 	gfx.DrawRect( Vec2( x.x,x.y ),
	// 		Vec2( x.width,x.height ),"orange" );
	// }
}
})();