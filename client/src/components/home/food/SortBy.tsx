import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Text } from '../../shared/typography'

interface Props {
  sortBy: string
  setSortBy: (newSortBy: string) => void
}

interface MenuItemOption {
  text: string
  value: string
  type?: 'Main'
  color?: 'primary'
}

const SortBy = ({ sortBy, setSortBy }: Props) => {
  const handleChangeInSort = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const menuItemOptions: MenuItemOption[] = [
    { text: 'None', value: 'None' },
    { text: 'Price: Ascending', value: 'asc' },
    { text: 'Price: Descending', value: 'desc' },
  ]

  return (
    <Box sx={{ margin: '0 5rem' }}>
      <FormControl>
        <InputLabel>
          <Text type="Small" color="">
            Sort By
          </Text>
        </InputLabel>

        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => handleChangeInSort(e.target.value as string)}
          sx={{ height: '3rem', minWidth: '10rem', borderRadius: '1rem' }}
        >
          {menuItemOptions.map((option, i) => (
            <MenuItem value={option.value} key={i}>
              <Text type={option.type ?? 'Main'} color={option.color ?? ''}>
                {option.text}
              </Text>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortBy
