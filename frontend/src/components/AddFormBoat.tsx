'use client';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { Field } from '@base-ui/react/field';
import { Button } from '@base-ui/react/button';
import { Form } from '@base-ui/react/form';
import styles from '../css/addform.module.css';
import fieldStyles from '../css/addform.module.css';
import submitButtonStyles from '../css/other.module.css'
import { Combobox } from '@base-ui/react/combobox'
import comboboxStyles from '../css/combobox.module.css';


export default function AddFormBoat({ isNew }: { isNew: boolean }) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<any[]>([])
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [searchKeyword, setSearchKeyword] = useState("");


    useEffect(() => {
        if (searchKeyword.length <= 1) {
            return;
        }

        const delayDebounce = setTimeout(() => {
            handleBoatSearch(searchKeyword);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchKeyword]);

    async function handleBoatSearch(keyword: string) {
        setErrors({})
        setLoading(true)
        try {
            const url = keyword
                ? `/api/boat/${encodeURIComponent(keyword)}`
                : `/api/boat`
            const res = await fetch(url)
            if (!res.ok) {
                setErrors({ server: await res.text() });
                setItems([]);
                return
            }
            setItems(await res.json())
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred ' })
        }
        finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setLoading(true);
        setErrors({});

        try {
            const rRes = await fetch('/api/boat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    boatName: formData.get('boat_name'),
                    modelYear: Number(formData.get('model_year')),
                })
            });
            if (!rRes.ok) throw new Error(await rRes.text() || 'Failed to create boat');

            alert("Success!");
        } catch (err: any) {
            setErrors({ server: err.message || 'An error occurred' });
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {isNew ? (
                <>
                    <h3>Boat</h3>
                    <Form onSubmit={handleSubmit} errors={errors}>
                        <Field.Root name="boat_name" className={fieldStyles.Field}>
                            <Field.Label className={fieldStyles.Label}>Boat name</Field.Label>
                            <Field.Control
                                type="text"
                                required
                                defaultValue=""
                                placeholder="Boat name"
                                className={fieldStyles.Input}
                            />
                            <Field.Error className={fieldStyles.Error} />
                        </Field.Root>
                        <Field.Root name="model_year" className={fieldStyles.Field}>
                            <Field.Label className={fieldStyles.Label}>Year Model</Field.Label>
                            <Field.Control
                                type="number"
                                required
                                defaultValue=""
                                placeholder="Year Model"
                                className={fieldStyles.Input}
                            />
                            <Field.Error className={fieldStyles.Error} />
                        </Field.Root>
                        <Button type="submit" disabled={loading} focusableWhenDisabled className={submitButtonStyles.Button_Custome}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Form>
                </>
            ) : (
                <>
                    <Field.Root name="boat_name" className={styles.Field}>
                        <Field.Label className={styles.Label}>Boat name</Field.Label>
                        <Combobox.Root onInputValueChange={(value: string) => setSearchKeyword(value)}>
                            <Field.Control render={(props) => (
                                <Combobox.Input
                                    {...props}
                                    type="text"
                                    required
                                    placeholder="Search for an existing boat..."
                                    className={fieldStyles.Input}
                                />
                            )}
                            />
                            <Combobox.Portal>
                                <Combobox.Positioner sideOffset={4}>
                                    <Combobox.Popup className={comboboxStyles.Popup}>
                                        <Combobox.List className={comboboxStyles.List}>
                                            {items.length === 0 && !loading && searchKeyword && (
                                                <Combobox.Empty className={comboboxStyles.Empty}>No boats found.</Combobox.Empty>
                                            )}
                                            {items.map((item) => (
                                                <Combobox.Item key={item.id} value={item.boatName} className={comboboxStyles.Item}>
                                                    {item.boatName}
                                                </Combobox.Item>
                                            ))}
                                        </Combobox.List>
                                    </Combobox.Popup>
                                </Combobox.Positioner>
                            </Combobox.Portal>
                        </Combobox.Root>
                        <Field.Error className={styles.Error} />
                    </Field.Root>
                </>
            )}
        </>
    );
}
