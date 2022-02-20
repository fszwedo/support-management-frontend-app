import ShiftChangeModal from '../components/ShiftRotaTable/ShiftChangeModal'

interface TestPageProps {
}


function TestPage (props: TestPageProps) {
    
    return <div>
      <ShiftChangeModal day='2022-01-05' closeHandler={() => {return null}}/>
    </div>
  }

export default TestPage;