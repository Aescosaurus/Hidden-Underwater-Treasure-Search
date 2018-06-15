function ColorTransformer()
{
	function Color( r,g,b )
	{
		this.r = r;
		this.g = g;
		this.b = b;
		// 
		this.GetColorCode=()=>
		{
			return( "rgb( " + this.r + "," + this.g + "," + this.b + " )" );
		}
	}
	const Clamp=( val,min,max )=>
	{
		if( val < min ) return( min );
		else if( val > max ) return( max );
		else return( val );
	}
	const Hex2RGB=( hexColor6Dig )=>
	{
		function GetVal( col )
		{
			if( col == 0 ) return( 0 );
			else if( col == 1 ) return( 1 );
			else if( col == 2 ) return( 2 );
			else if( col == 3 ) return( 3 );
			else if( col == 4 ) return( 4 );
			else if( col == 5 ) return( 5 );
			else if( col == 6 ) return( 6 );
			else if( col == 7 ) return( 7 );
			else if( col == 8 ) return( 8 );
			else if( col == 9 ) return( 9 );
			else if( col == 'A' ) return( 10 );
			else if( col == 'B' ) return( 11 );
			else if( col == 'C' ) return( 12 );
			else if( col == 'D' ) return( 13 );
			else if( col == 'E' ) return( 14 );
			else if( col == 'F' ) return( 15 );
		}
		const colors = [];
		for( var i = 1; i <= 6; i += 2 )
		{
			const sum = ( GetVal( hexColor6Dig[i] ) * 16 ) +
				GetVal( hexColor6Dig[i + 1] );
			colors.push( sum );
		}
		
		return( new Color( colors[0],colors[1],colors[2] ) );
	}
	// const RGB2Hex=( rgbColor )=>
	// {
	// 	
	// }
	const BrightenBy=( color,amount )=>
	{
		color.r += amount;
		color.g += amount;
		color.b += amount;
		color.r = Clamp( color.r,0,255 );
		color.g = Clamp( color.g,0,255 );
		color.b = Clamp( color.b,0,255 );
	}
	const DarkenBy=( color,amount )=>
	{
		color.r -= amount;
		color.g -= amount;
		color.b -= amount;
		color.r = Clamp( color.r,0,255 );
		color.g = Clamp( color.g,0,255 );
		color.b = Clamp( color.b,0,255 );
	}
	const GetTimeOffset=()=>
	{
		const hrs = new Date().getHours();
		const dist = Math.abs( 12 - hrs );
		return( dist );
	}
	// 
	const cache = [];
	// 
	this.Transform=( color )=>
	{
		for( var item in cache )
		{
			if( cache[item].key == color )
			{
				return( cache[item].val );
			}
		}
		
		let realColor;
		if( color.length == 7 )
		{
			realColor = color;
		}
		else if( color.length == 4 )
		{
			let temp = "#";
			for( let i = 1; i <= 3; ++i )
			{
				for( let j = 0; j < 2; ++j )
				{
					temp += color[i];
				}
			}
			realColor = temp;
		}
		else
		{
			console.log( "ERROR || Color transformation failure: invalid color input!" );
			return( color );
		}
		
		const temp = Hex2RGB( realColor );
		DarkenBy( temp,GetTimeOffset() * 10 );
		return( temp.GetColorCode() );
	}
}