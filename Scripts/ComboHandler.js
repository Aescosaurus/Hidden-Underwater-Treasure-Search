function ComboHandler( gfx )
{
	const bar = new HealthBar( 10 * 30,
		Vec2( 10,gfx.ScreenHeight - 14 ) );
	let scoreMult = 1;
	const scoreTimer = new Timer( 20.0 * 30 );
	// 
	this.Update=()=>
	{
		if( scoreMult > 1 )
		{
			scoreTimer.Update();
			bar.SetCur( bar.GetMax() - scoreTimer.GetPercent() * bar.GetMax() );

			if( scoreTimer.IsDone() )
			{
				scoreTimer.Reset();
				// --scoreMult;
				scoreMult = 1;
			}
		}
	}
	
	this.Draw=( gfx )=>
	{
		gfx.DrawText( Vec2( gfx.ScreenWidth / 2 - 75,gfx.ScreenHeight - 25 ),
			"25PX Lucida Console","white","Combo x " + scoreMult );
		gfx.DrawRect( Vec2( 8,gfx.ScreenHeight - 14 - 2 ),
			Vec2( gfx.ScreenWidth - 20 + 4,8 ),"white" );
		bar.Draw( gfx.ScreenWidth - 20,4,gfx,"#99E65F" );
	}
	
	this.AddAndRefresh=()=>
	{
		++scoreMult;
		scoreTimer.Reset();
	}
	
	this.Reset=()=>
	{
		scoreMult = 1;
		scoreTimer.Reset();
		bar.Reset();
	}
	
	this.GetScoreMult=()=> { return( scoreMult ); }
}