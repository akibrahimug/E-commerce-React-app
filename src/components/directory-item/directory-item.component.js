/* eslint-disable react/prop-types */
import React from 'react'
import { DirectoryItemContainer, DirectoryItemBody } from './directory-item.styles'
import { useNavigate } from 'react-router-dom'

function DirectoryItem({ category }) {
  const { title, imageUrl, route } = category
  const navigate = useNavigate()

  const handleNavigate = () => navigate(route)
  return (
    <DirectoryItemContainer onClick={handleNavigate}>
      {/* img */}
      <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
