import { db } from '@/config/firebase';
import { IReport } from '@/types/model/report';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'Report'),
      orderBy('createdDate', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const reportData: IReport[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<IReport, 'id'>;
        return {
          id: doc.id,
          ...data,
        };
      });
      setReports(reportData);
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2>Daftar Report (Real-time)</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.description?.[0] ?? '(Tidak ada deskripsi)'} - {report.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardPage