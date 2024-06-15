import Table from '@/components/table/table';
import WatchList from '@/components/watchList/watchList';

export default function Home() {
  return (
    <main className='main'>
      <div className='main__table'>
        <Table />
      </div>
      <div className='main__watchList'>
        <WatchList />
      </div>
    </main>
  );
}
