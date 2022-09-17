import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Toggle from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import { useEffect, useState, FormEvent } from 'react';
import { Game } from '../App'
import axios from 'axios';


export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [voice, setVoice] = useState<Boolean>(false);

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data);
            })

            , []
    });

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        //Criar a validação aqui!!!

        try {
            await axios.post(`http://192.168.1.154:3333/games/${data.game}/ads`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": voice
            });
            alert('Anúncio criado com sucesso!');
        } catch (error) {
            alert('Erro ao criar anúncio');
            console.log(error);
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed py-8 px-10 bg-[#2A2634] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-[32px] text-white font-black'>Publique um anúncio</Dialog.Title>


                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold' >Qual o game?</label>
                        <select id='game' name='game' defaultValue=''
                            className='bg-zinc-900 py-3 px-4 rounded text-sm appearance-none'
                        >
                            <option disabled className=' text-zinc-500'>Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id='name' name='name' type="text" placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input id='yearsPlaying' name='yearsPlaying' type="text" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input id='discord' name='discord' type="text" placeholder='Usuario#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <Toggle.Root type='multiple' className='grid grid-cols-4 gap-2'
                                onValueChange={setWeekDays} value={weekDays}
                            >
                                <Toggle.Item value='0' className={`w-8 h-8 rounded  text-white ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo' >D</Toggle.Item>
                                <Toggle.Item value='1' className={`w-8 h-8 rounded  text-white ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda' >S</Toggle.Item>
                                <Toggle.Item value='2' className={`w-8 h-8 rounded  text-white ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça' >T</Toggle.Item>
                                <Toggle.Item value='3' className={`w-8 h-8 rounded  text-white ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta' >Q</Toggle.Item>
                                <Toggle.Item value='4' className={`w-8 h-8 rounded  text-white ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta'>Q</Toggle.Item>
                                <Toggle.Item value='5' className={`w-8 h-8 rounded  text-white ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta'>S</Toggle.Item>
                                <Toggle.Item value='6' className={`w-8 h-8 rounded  text-white ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sábado' >S</Toggle.Item>
                            </Toggle.Root>


                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input id='hourStart' name='hourStart' type="time" placeholder='De' />
                                <Input id='hourEnd' name='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root className='w-6 h-6 rounded bg-zinc-900' id='voice' name='voice'
                            onCheckedChange={(checked) => { checked ? setVoice(true) : setVoice(false) }}
                        >
                            <Checkbox.CheckboxIndicator className='flex justify-center align-middle' >
                                <Check size={16} className='text-emerald-400 font-black' />
                            </Checkbox.CheckboxIndicator>
                        </Checkbox.Root>
                        <label htmlFor="voice">Costumo me conectar ao chat de voz</label>
                    </div>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-slate-600'>Cancelar</Dialog.Close>
                        <button className='bg-violet-500 rounded-md px-5 h-12 font-semibold flex items-center gap-3 hover:bg-violet-700' type='submit'>
                            <GameController size={24} />
                            Encontrar Duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>

        </Dialog.Portal>
    )
} 