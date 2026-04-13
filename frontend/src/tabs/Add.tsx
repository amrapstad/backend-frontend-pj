import * as React from 'react';
import { useState, useEffect } from 'react'
import { Form } from '@base-ui/react/form';
import { Button } from '@base-ui/react/button';
import Navbar from '../components/Tab';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import AddFormBoat from '../components/AddFormBoat';
import AddFormOwner from '../components/AddFormOwner';
import AddFormReciept from '../components/AddFormReciept';
import customStyles from '../css/other.module.css';
import selectStyles from '../css/select.module.css';
import radioStyles from '../css/radio.module.css';

const styles = { ...selectStyles, ...customStyles, ...radioStyles };

export default function Add() {
    const id = React.useId();
    const [selectedTab, setSelectedTab] = React.useState('add_boat');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    return (
        <>
            <h1> Add </h1>
            {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
            <RadioGroup value={selectedTab} onValueChange={setSelectedTab} aria-labelledby={id} defaultValue="add_boat" className={radioStyles.RadioGroup}>
                <div className={radioStyles.Caption} id={id}>
                    Select to add
                </div>

                <label className={radioStyles.Item}>
                    <Radio.Root value="add_boat" className={styles.Radio}>
                        <Radio.Indicator className={styles.Indicator} />
                    </Radio.Root>
                    Add Boat
                </label>

                <label className={radioStyles.Item}>
                    <Radio.Root value="add_owner" className={styles.Radio}>
                        <Radio.Indicator className={styles.Indicator} />
                    </Radio.Root>
                    Add Owner
                </label>

                <label className={radioStyles.Item}>
                    <Radio.Root value="add_reciept" className={styles.Radio}>
                        <Radio.Indicator className={styles.Indicator} />
                    </Radio.Root>
                    Add Reciept
                </label>
            </RadioGroup>
            {selectedTab == 'add_boat' && <AddFormBoat isNew={true} />}
            {selectedTab == 'add_owner' && <AddFormOwner isNew={true} />}
            {selectedTab == 'add_reciept' && <AddFormReciept />}
        </>
    )
}
