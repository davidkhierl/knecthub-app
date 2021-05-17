import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import Head from 'next/head';
import MainLayout from '@/components/layouts/MainLayout';
import { PageWithLayout } from '@/typings/page';
import ProtectedRoute from '../auth/ProtectedRoute';
import React from 'react';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const SchedulesPage: PageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Schedules | Knecthub</title>
      </Head>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor='start'
        endAccessor='end'
        style={{ height: '100%' }}
      />
    </>
  );
};

SchedulesPage.getLayout = (page) => (
  <ProtectedRoute redirect='/signin'>
    <MainLayout>{page}</MainLayout>
  </ProtectedRoute>
);

export default SchedulesPage;
