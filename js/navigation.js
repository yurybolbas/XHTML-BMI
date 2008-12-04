function drawTopNavigation (navigationContent, selected, path)
{
	var str = '<table class="navigation" cellpadding="0" cellspacing="0" border="0"><tr>';

	for (var i = 0; i < navigationContent.length; i++)
	{
		str += '<td class="';

		x = '';

		if (i == navigationContent.length - 1)
		{
			str += 'navigationLastItem';
			x = ' ';
		}
		else if (i == selected - 1)
		{
			str += 'navigationNextSelected';
			x = ' ';
		}

		if (i == selected)
		{
			str += x+'navigationSelectedItem"><strong>';
			str += navigationContent[i][1];
			str += '</strong></td>';
		}
		else
		{
			str += '"><a href="';
			str += ((navigationContent[i][0].indexOf("#") == 0)?'':path) + navigationContent[i][0];
			str += '">';
			str += navigationContent[i][1];
			str += '</a>';
		}

		str += '</td>';
	}

	str += '</tr></table>';

	document.write (str);
}

function drawBottomNavigation (navigationContent, path)
{
	var str = '<div class="navigation">';

	for (var i = 0; i < navigationContent.length; i++)
	{
		str += '<a href="';
		str += ((navigationContent[i][0].indexOf("#") == 0)?'':path) + navigationContent[i][0];
		str += '">';
		str += navigationContent[i][1];
		str += '</a>';

		if (i != navigationContent.length - 1)
		{
			str += '<span> | </span>';
		}
	}

	str += '</div>';

	document.write (str);
}



try{registerJS("js/navigation.js");}
catch(e){}