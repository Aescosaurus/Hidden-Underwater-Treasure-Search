"use strict";

(function()
{
const gfx = new Graphics();
const kbd = new Keyboard();
const ms = new Mouse();
const sfx = new Sound();

const ct = new ColorTransformer();

const menu = new Menu( gfx,sfx,ct );
let menuActive = true;
const shop = new UpgradeShop( ct,gfx );
let shopActive = false;

const sub = new Submarine( 60,60,shop,gfx );
const world = new Map( shop );

let gold = 1560;
let moveAmount = Vec2( 0,0 );

const enemyBullets = [];
const torpedoes = [];

let paused = false;
const pauseButton = new ImageButton( gfx.ScreenWidth - 40,8,
	32,32,gfx.LoadImage( "Images/PauseButton1.png" ),
	gfx.LoadImage( "Images/PauseButton2.png" ) );

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
	// if( kbd.KeyDown( ' ' ) ) return;
	
	if( shopActive )
	{
		const payAmount = shop.Update( gold,ms );
		if( payAmount > 0 )
		{
			gold -= payAmount;
			shop.CoolItForASec();
		}
		
		if( shop.Done() || kbd.KeyDown( 13 ) )
		{
			shopActive = false;
			PartialReset();
		}
		// else if( shop.USpeed() )
		// {
		// 	sub.UpgradeSpeed();
		// }
		// else if( shop.UDamage() )
		// {
		// 	world.UpgradeSubDamage();
		// }
		// else if( shop.URange() )
		// {
		// 	sub.UpgradeRange();
		// }
		
		return;
	}
	
	if( menuActive || paused )
	{
		menu.Update( ms );
		
		if( menu.WillStart() || kbd.KeyDown( 13 ) )
		{
			menuActive = false;
		}
		
		if( menu.WillResume() || kbd.KeyDown( 13 ) )
		{
			paused = false;
			menu.Pause( false );
		}
		
		return;
	}
	
	pauseButton.Update( ms );
	if( pauseButton.IsPressed() ) Pause();
	
	// Update below.
	sub.Update( kbd );
	sub.DoTorpedoStuff( torpedoes,world.GetEnemies() );
	
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
	
	world.Update( sub.GetPos(),gfx,torpedoes );
	
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
		
		if( enemyBullets[eb].WillKill() )
		{
			enemyBullets.splice( eb,1 );
		}
	}
	
	// for( var eb in enemyBullets )
	// {
	// }
	
	for( var tp in torpedoes )
	{
		const torp = torpedoes[tp];
		
		torp.MoveBy( sub.GetDelta() );
		
		torp.Update();
		
		torp.Target( world
			.GetClosestEnemy( torp.GetPos() )
			.GetPos() );
		
		if( torp.IsDead() )
		{
			torpedoes.splice( tp,1 );
		}
	}
	
	sub.ResetDelta();
	
	if( sub.GetPos().y < 0 )
	{
		// Return to shop.
		menuActive = false;
		shopActive = true;
	}
}

function Draw()
{
	gfx.DrawRect( Vec2( 0,0 ),gfx.ScreenSize,
		/*ct.Transform2( "#269" )*/ct.GetWaterColor() );
	gfx.DrawRect( Vec2( 0,moveAmount.y )
		.GetSubtracted( Vec2( 0,gfx.ScreenHeight ) ),
		gfx.ScreenSize,/*ct.Transform2( "#48A" )*/
		ct.GetSkyColor() );
	
	// if( kbd.KeyDown( ' ' ) ) return;
	
	if( shopActive )
	{
		shop.Draw( gfx,ms );
	
		gfx.DrawText( Vec2( 115,25 ),"25PX Lucida Console",
			"gold",gold );
		
		return;
	}
	
	if( menuActive || paused )
	{
		menu.Draw( gfx );
		
		return;
	}
	
	pauseButton.Draw( gfx );
	
	// Draw below.
	world.Draw( gfx );
	
	for( var eb in enemyBullets )
	{
		enemyBullets[eb].Draw( gfx );
	}
	
	for( var tp in torpedoes )
	{
		torpedoes[tp].Draw( gfx );
		
		// const ens = world.GetEnemies();
		// for( var e in ens )
		// {
		// 	const cols = [ "red","orange","yellow","green","cyan","purple" ];
		// 	const randColor = cols[Random.Range( 0,cols.length - 1 )];
		// 	gfx.DrawLine( torpedoes[tp].GetPos(),ens[e].GetPos(),randColor,5 );
		// 	const p = ens[e].GetPos().GetSubtracted( torpedoes[tp].GetPos() );
		// 	gfx.DrawLine( sub.GetPos(),
		// 		sub.GetPos().GetAdded( p ),"red" );
		// 	// console.log( p );
		// 	// console.log( randColor );
		// }
		
		// const p = torpedoes[tp].GetPos();
		// gfx.DrawLine( p,world.GetClosestEnemy( p ).GetPos(),"orange",2 );
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

function Pause()
{
	paused = true;
	menu.Pause( paused );
}

function PartialReset()
{
	enemyBullets.splice( 0,enemyBullets.length );
	torpedoes.splice( 0,torpedoes.length );
	moveAmount = Vec2( 0,0 );
	sub.Reset();
	
	world.Reset();
	world.InitWorld( gfx,enemyBullets );
}
})();