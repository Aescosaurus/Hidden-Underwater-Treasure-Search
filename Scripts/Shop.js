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
		this.GetTotal=()=>
		{
			let total = 0;
			for( let i = cur; i > 0; --i )
			{
				total += i / this.max;
			}
			return( total );
		}
		this.GetTotal2=()=>
		{
			let total = 0;
			total += this.cur / this.max;
			total += ( this.cur - 1 ) / this.max;
		}
		this.GetPrice=( maxPrice )=>
		{
			return( Math.ceil( this.GetAmount() * maxPrice ) );
		}
		this.IsAtMax=()=>
		{
			return( this.cur == this.max );
		}
	}
	// 
	const cont = new Button( gfx.ScreenWidth - 210,
		gfx.ScreenHeight - 60,ct,"Continue",35 );
	const uEngine = new Button( 70,170,ct,"Speed",45 );
	const uDamage = new Button( 70,310,ct,"Damage",45 );
	const uRange = new Button( 410,170,ct,"Range",45 );
	const uFuel = new Button( 410,310,ct,"Fuel",45 );
	
	const engRange = new Range( 1,6 );
	const dmgRange = new Range( 1,6 );
	const rngRange = new Range( 1,6 );
	const fUlRange = new Range( 1,6 );
	
	let drawPrice = 0;
	
	const maxPrice = 260;
	// 
	this.Update=( money,ms )=>
	{
		cont.Update( ms );
		
		uEngine.Update( ms );
		uDamage.Update( ms );
		uRange.Update( ms );
		uFuel.Update( ms );
		
		drawPrice = 0;
		
		if( uEngine.IsHovering() )
		{
			drawPrice = engRange.GetPrice( maxPrice );
		}
		if( money > engRange.GetPrice( maxPrice ) &&
			!engRange.IsAtMax() )
		{
			if( uEngine.IsPressed() )
			{
				const price = engRange.GetPrice( maxPrice );
				++engRange.cur;
				return( price );
			}
		}
		else uEngine.Reset();
		
		if( uDamage.IsHovering() )
		{
			drawPrice = dmgRange.GetPrice( maxPrice );
		}
		if( money > dmgRange.GetPrice( maxPrice ) &&
			!dmgRange.IsAtMax() )
		{
			if( uDamage.IsPressed() )
			{
				const price = dmgRange.GetPrice( maxPrice );
				++dmgRange.cur;
				return( price );
			}
		}
		else uDamage.Reset();
		
		if( uRange.IsHovering() )
		{
			drawPrice = rngRange.GetPrice( maxPrice );
		}
		if( money > rngRange.GetPrice( maxPrice ) &&
			!rngRange.IsAtMax() )
		{
			if( uRange.IsPressed() )
			{
				const price = rngRange.GetPrice( maxPrice );
				++rngRange.cur;
				return( price );
			}
		}
		else uRange.Reset();
		
		if( uFuel.IsHovering() )
		{
			drawPrice = fUlRange.GetPrice( maxPrice );
		}
		if( money > fUlRange.GetPrice( maxPrice ) &&
			!fUlRange.IsAtMax() )
		{
			if( uFuel.IsPressed() )
			{
				const price = fUlRange.GetPrice( maxPrice );
				++fUlRange.cur;
				return( price );
			}
		}
		else uFuel.Reset();
		
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
		
		uFuel.Draw( gfx );
		DrawBar( uFuel,fUlRange );
		
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
		uFuel.Reset();
	}
	
	this.Done=()=> { return( cont.IsPressed() ); }
	
	this.SpeedAdd=()=> { return( engRange.GetAmount() ); }
	
	this.DamageAdd=()=> { return( dmgRange.GetAmount() ); }
	
	this.RangeAdd=()=> { return( rngRange.GetAmount() ); }
	
	this.FuelAdd=()=> { return( fUlRange.GetAmount() ); }
}