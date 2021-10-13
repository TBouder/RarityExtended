/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					October 14th 2021
**	@Filename:				the-stage.js
******************************************************************************/

import	React, {useState, createContext, useContext}			from	'react';
import	Image									from	'next/image';
import	Link									from	'next/link';
import	DialogBox								from	'components/DialogBox';
import	Box								from	'components/Box';
import	toast				from	'react-hot-toast';

const	classMappingBackImg = [
	'',
	'/classes/back/barbarian.svg',
	'/classes/back/bard.png',
	'/classes/back/cleric.png',
	'/classes/back/druid.png',
	'/classes/back/fighter.png',
	'/classes/back/monk.svg',
	'/classes/back/paladin.png',
	'/classes/back/ranger.png',
	'/classes/back/rogue.png',
	'/classes/back/sorcerer.png',
	'/classes/back/wizard.png',
];

const PerformanceContext = createContext(null);

function AdventureResult() {
	const {performanceResult} = useContext(PerformanceContext);

	const title = performanceResult.success
		? performanceResult.crit 
			? 'Legendary Performance !!' 
			: 'Good Show !'
		: 'Oof, you bombed hard...';

	const message = performanceResult.success
		? performanceResult.crit 
			? 'The whole tavern is on its feet, a standing ovation. Even the hooligans are cheering you on. Facu is so impressed he hands you a mission pass along with your door prize !' 
			: 'Well, you\'re no Orpheus or Keoghtom, but you got the job done. The hooligans have settled down and Facu has a door prize for you !'
		: 'Your performance was so bad it actually made the hooligans worse. Facu only has one word for you. Cringe !';

	return <div className={'max-w-screen-sm w-full mt-12 mr-auto ml-auto'}>
		<p className={'text-yellow-300'}>{title}</p>
		<p className={'text-sm opacity-80'}>{message}</p>
		<div className={'flex w-full items-start justify-center mt-8'}>
			{performanceResult.prizes.map(prize => {
				return (
					<div key={prize.tokenId} className={'flow  justify-center w-56'}>
						<div className={'text-center mb-4'}>
							<Image
								src={`/openmic-prizes/${prize.image}`}
								loading={'eager'}
								quality={100}
								width={100}
								height={100}
								/>
						</div>
						<div className={'text-xs text-center'}>{prize.name}</div>
					</div>
				)
			})}
		</div>
		<Link href={'/town/quest'}>
			<div className={'text-base text-white mt-16 mx-4 md:mx-0 py-2 px-4 max-w-screen-sm text-center animate-pulse border-t-4 border-b-4 border-white hover:bg-white hover:text-black transition-colors cursor-pointer hover:animate-none'} style={{cursor: 'pointer'}}>
				{'Start a new adventure'}
			</div>
		</Link>
	</div>
}

function Adventure({ router, adventurer }) {
	const {set_performanceResult} = useContext(PerformanceContext);

	function abilityModifier(ability) {
    if (ability < 10) return -1;
    return (ability - 10) / 2;
	}

	function abilityModifierFormated(ability) {
		const modifier = abilityModifier(ability);
		if(modifier === 0) return "0";
		if(modifier > 0) return `+${modifier}`;
		return `-${modifier}`;
	}

	function odds(perform, charisma, treasures) {
		if(perform < 1) return 0;
		const d = 20;
		const dc = 10;
		const bonus = perform 
			+ abilityModifier(charisma)
			+ ((treasures.length > 0) ? 1 : 0);
		const result = Math.min((d - 1)/d, (dc + bonus)/d);
		return `${(result * 100).toFixed(0)} %`;
	}

	async function perform() {
		const	_toast = toast.loading('Performing on the tavern stage...');
		await new Promise(resolve => setTimeout(resolve, 5000));
		toast.dismiss(_toast);
		set_performanceResult({
			success: true,
			crit: true,
			prizes: [
				{ 
					tokenId: 0,
					rare: false,
					index: 0,
					name: 'Tiger Signet Ring',
					image: 'ring.png'
				},
				{ 
					tokenId: 1,
					rare: true,
					index: 0,
					name: 'Secret Mission Pass from Murderteeth',
					image: 'missionpass.png'
				}
			]
		});
	}

	return <>
	<div className={'max-w-screen-sm w-full mt-12 mr-auto ml-auto'}>
		<div className={'flex flex-col items-center'}>

			{/* antagonist */}
			<div className={'w-full'}>
				<p className={'whitespace-nowrap'}>{'Rowdy Tavern Hooligans !'}</p>
				<div className={'flex w-full items-center justify-center'}>
					<div className={'-mr-12'}>
						<Image
							src={'/avatar/ceazor.gif'}
							loading={'eager'}
							quality={100}
							width={100}
							height={100}
							/>
					</div>
					<div className={'-mr-12'}>
						<Image
							src={'/avatar/janet.gif'}
							loading={'eager'}
							quality={100}
							width={120}
							height={120} />
					</div>
					<Image
						src={'/avatar/facu.gif'}
						loading={'eager'}
						quality={100}
						width={150}
						height={150} />
					<div className={'-ml-6'}>
						<Image
							src={'/avatar/ivan.gif'}
							loading={'eager'}
							quality={100}
							width={90}
							height={90} />
					</div>
					<div className={'-ml-12'}>
						<Image
							src={'/avatar/lara.gif'}
							loading={'eager'}
							quality={100}
							width={100}
							height={100} />
					</div>
				</div>
			</div>

			{/* protagonist */}
			<div className={'w-full flex mt-2 md:-mt-10'}>
				<div className={'w-60 hidden md:block'} style={{minWidth: 240}}>
					<Image
						src={classMappingBackImg[adventurer.class]}
						loading={'eager'}
						quality={100}
						width={240}
						height={240} />
				</div>
				<div className={'w-32 block md:hidden'} style={{minWidth: 120}}>
					<Image
						src={classMappingBackImg[adventurer.class]}
						loading={'eager'}
						quality={100}
						width={120}
						height={120} />
				</div>
				<div className={'w-full mt-auto mb-6'}>
					<Box className={'nes-container pt-6 pb-0 px-4 with-title w-full '}>
						<div className={'title bg-white dark:bg-dark-600 z-10 relative'} style={{paddingTop: 2}}>
							Performance Check
						</div>
						<div className={'flex justify-between'}>
							<div className={'text-sm opacity-80'}>Perform Skill</div>
							<div className={''}>+5</div>
						</div>
						<div className={'flex justify-between'}>
							<div className={'text-sm opacity-80'}>Charisma</div>
							<div className={''}>{abilityModifierFormated(18)}</div>
						</div>
						<div className={'flex justify-between'}>
							<div className={'text-sm opacity-80'}>Forest Treasures</div>
							<div className={''}>+1</div>
						</div>
						<div className={'flex justify-between'}>
							<div className={'text-sm opacity-80'}>Odds</div>
							<div className={''}>{odds(5, 18, [1])}</div>
						</div>
						<br />
					</Box>
				</div>
			</div>

		</div>
	</div>

	<div className={'max-w-screen-md w-full mx-auto'}>
		<DialogBox
				options={[
					{label: 'SING YOUR HEART OUT', onClick: perform},
					{label: 'I CAN\'T HANDLE THE PRESSURE !', onClick: () => router.back()},
				]} />
	</div>
	</>
}

export default TheStage = ({rarities, router}) => {
	const	[performanceResult, set_performanceResult] = useState(null);

	if (!rarities || rarities === {}) {
		return null;
	}
	if (!rarities[router?.query?.adventurer]) {
		if (typeof(window) !== 'undefined')
			router.push('/');
		return null;
	}

	const adventurer = rarities[router?.query?.adventurer];

	return (
		<PerformanceContext.Provider value={{ performanceResult, set_performanceResult }}>
			<section className={'relative'}>
				{!performanceResult && <Adventure router={router} adventurer={adventurer}></Adventure>}
				{performanceResult && <AdventureResult></AdventureResult>}
			</section>
		</PerformanceContext.Provider>
	);
}