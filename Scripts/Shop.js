function UpgradeShop( ct,gfx )
{
	function Range( cur,max )
	{
		this.cur = cur;
		this.max = max;
		// 
		this.GetAmount=()=>
		{
			return( this.cur / this.max );
		}
		this.GetPrice=( maxPrice )=>
		{
			return( Math.ceil( this.GetAmount() * maxPrice ) );
		}
	}
	// 
	const cont = new Button( gfx.ScreenWidth - 210,
		gfx.ScreenHeight - 60,ct,"Continue",35 );
	const uEngine = new Button( 70,120,ct,"Speed",45 );
	const uDamage = new Button( 70,220,ct,"Damage",45 );
	const uRange = new Button( 70,320,ct,"Range",45 );
	
	const engRange = new Range( 1,6 );
	const dmgRange = new Range( 1,6 );
	const rngRange = new Range( 1,6 );
	
	let drawPrice = 0;
	
	const maxPrice = 260;
	// 
	this.Update=( money,ms )=>
	{
		cont.Update( ms );
		
		uEngine.Update( ms );
		uDamage.Update( ms );
		uRange.Update( ms );
		
		drawPrice = 0;
		
		if( money > engRange.GetPrice( maxPrice ) )
		{
			if( uEngine.IsHovering() )
			{
				drawPrice = engRange.GetPrice( maxPrice );
			}
			
			if( uEngine.IsPressed() )
			{
				const price = engRange.GetPrice( maxPrice );
				++engRange.cur;
				return( price );
			}
		}
		else uEngine.Reset();
		
		if( money > dmgRange.GetPrice( maxPrice ) )
		{
			if( uDamage.IsHovering() )
			{
				drawPrice = dmgRange.GetPrice( maxPrice );
			}
			
			if( uDamage.IsPressed() )
			{
				const price = dmgRange.GetPrice( maxPrice );
				++dmgRange.cur;
				return( price );
			}
		}
		else uDamage.Reset();
		
		if( money > rngRange.GetPrice( maxPrice ) )
		{
			if( uRange.IsHovering() )
			{
				drawPrice = rngRange.GetPrice( maxPrice );
			}
			
			if( uRange.IsPressed() )
			{
				const price = rngRange.GetPrice( maxPrice );
				++rngRange.cur;
				return( price );
			}
		}
		else uRange.Reset();
		
		return( 0 );
	}
	
	this.Draw=( gfx,ms )=>
	{
		function DrawBar( thing,range )
		{
			gfx.DrawRect( thing.GetPos()
				.GetAdded( Vec2( 0,thing.GetHeight() ) ),
				Vec2( range.GetAmount() *
				thing.GetWidth(),20 ),
				"#FFC825" );
		}
		gfx.DrawText( Vec2( 70,80 ),"50PX Lucida Console",
			"white","Upgrade Shop" );
		
		cont.Draw( gfx );
		
		uEngine.Draw( gfx );
		DrawBar( uEngine,engRange );
		uDamage.Draw( gfx );
		DrawBar( uDamage,dmgRange );
		uRange.Draw( gfx );
		DrawBar( uRange,rngRange );
		
		if( drawPrice != 0 )
		{
			gfx.DrawText( ms.GetPos(),"25PX Lucida Console",
				"#FFC825","Price: " + drawPrice );
		}
	}
	
	this.CoolItForASec=()=>
	{
		uEngine.Reset();
		uDamage.Reset();
		uRange.Reset();
	}
	
	this.Done=()=> { return( cont.IsPressed() ); }
	
	this.USpeed=()=> { return( uEngine.IsPressed() ); }
	
	this.UDamage=()=> { return( uDamage.IsPressed() ); }
	
	this.URange=()=> { return( uRange.IsPressed() ); }
}