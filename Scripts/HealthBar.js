function HealthBar( maxHP,startPos )
{
	let max = maxHP;
	let curHP = maxHP;
	// 
	this.Draw=( width,height,gfx,color = "#FF0040" )=>
	{
		if( curHP > 0 )
		{
			gfx.DrawRect( startPos,
				Vec2( ( curHP / maxHP ) * width,height ),
				color );
		}
	}
	
	this.LoseHP=( amount )=> { curHP -= amount; }
	
	this.Reset=()=> { curHP = max; }
	
	this.SetMax=( amount )=> { max = amount; }
	
	this.SetCur=( amount )=> { curHP = amount; }
	
	this.GetHP=()=> { return( curHP ); }
	
	this.GetMax=()=> { return( max ); }
}